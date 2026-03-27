import axiosInstance from "@/libs/axios/instance";
import axios from "axios";
import {
  ApiResponse,
  FileUploadOptions,
  UploadUrlResponse,
  UploadConfirmResponse,
  FileInfo,
  DownloadResponse,
} from "@/types/api";

class FileApiService {
  /**
   * Step 1: Get signed upload URL from backend
   */
  async getUploadUrl(
    fileName: string,
    fileType: string,
    fileSize: number
  ): Promise<UploadUrlResponse> {
    const response = await axiosInstance.post<ApiResponse<UploadUrlResponse>>(
      "/files/get-upload-url",
      {
        fileName,
        fileType,
        fileSize,
      }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to get upload URL");
    }

    return response.data.data;
  }

  /**
   * Step 2: Upload file directly to Cloudinary
   */
  async uploadToCloudinary(
    file: File,
    uploadData: UploadUrlResponse
  ): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", uploadData.apiKey);
    formData.append("timestamp", uploadData.timestamp.toString());
    formData.append("signature", uploadData.signature);
    formData.append("public_id", uploadData.publicId);
    formData.append("folder", uploadData.folder);
    // formData.append("resource_type", "auto");

    // Direct upload to Cloudinary (no interceptors)
    const response = await axios.post(uploadData.uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      },
    });

    if (!response.data.secure_url) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    return response.data.secure_url;
  }

  /**
   * Step 3: Confirm upload with backend
   */
  async confirmUpload(
    cloudinaryUrl: string,
    file: File,
    options: FileUploadOptions
  ): Promise<UploadConfirmResponse> {
    const response = await axiosInstance.post<
      ApiResponse<UploadConfirmResponse>
    >("/files/upload-file", {
      cloudinaryUrl,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      ...options,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to confirm upload");
    }

    return response.data.data;
  }

  /**
   * Complete upload flow
   */
  async uploadFile(
    file: File,
    options: FileUploadOptions,
    onProgress?: (progress: number) => void
  ): Promise<UploadConfirmResponse> {
    try {
      // Step 1: Get upload URL
      onProgress?.(10);
      const uploadData = await this.getUploadUrl(
        file.name,
        file.type,
        file.size
      );

      // Step 2: Upload to Cloudinary
      onProgress?.(30);
      const cloudinaryUrl = await this.uploadToCloudinary(file, uploadData);

      // Step 3: Confirm with backend
      onProgress?.(80);
      console.log("debug-options", options);
      const result = await this.confirmUpload(cloudinaryUrl, file, options);

      onProgress?.(100);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get file information by code
   */
  async getFileInfo(code: string): Promise<FileInfo> {
    const response = await axiosInstance.get<ApiResponse<FileInfo>>(
      `/files/file/${code}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "File not found");
    }

    return response.data.data;
  }

  /**
   * Download file
   */
  async downloadFile(code: string, password?: string): Promise<string> {
    const response = await axiosInstance.post<ApiResponse<DownloadResponse>>(
      "/files/download",
      {
        code,
        password,
      }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Download failed");
    }

    return response.data.data.url;
  }

  /**
   * Delete file
   */
  async deleteFile(fileId: string): Promise<void> {
    const response = await axiosInstance.delete<ApiResponse>(
      `/files/file/${fileId}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Delete failed");
    }
  }
}

export default new FileApiService();
