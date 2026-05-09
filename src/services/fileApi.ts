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

export interface PreUploadResult {
  secureUrl: string;
  resourceType: string;
  publicId: string;
}

class FileApiService {
  /**
   * Step 1: Get signed upload URL from backend
   */
  async getUploadUrl(
    fileName: string,
    fileType: string,
    fileSize: number,
  ): Promise<UploadUrlResponse> {
    const response = await axiosInstance.post<ApiResponse<UploadUrlResponse>>(
      "/files/get-upload-url",
      {
        fileName,
        fileType,
        fileSize,
      },
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
    uploadData: UploadUrlResponse,
    onProgress?: (_p: number) => void,
  ): Promise<PreUploadResult> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", uploadData.apiKey);
    formData.append("timestamp", uploadData.timestamp.toString());
    formData.append("signature", uploadData.signature);
    formData.append("public_id", uploadData.publicId);
    formData.append("folder", uploadData.folder);

    // Direct upload to Cloudinary (no interceptors)
    const response = await axios.post(uploadData.uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress?.(percentCompleted);
        }
      },
    });

    if (!response.data.secure_url) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    return {
      secureUrl: response.data.secure_url,
      resourceType: response.data.resource_type,
      publicId: response.data.public_id,
    };
  }

  /**
   * Pre-upload: Get signed URL + upload to Cloudinary temp folder (Steps 1+2)
   * Called immediately when user selects a file for eager uploading.
   */
  async preUpload(
    file: File,
    onProgress?: (_p: number) => void,
  ): Promise<PreUploadResult> {
    // Step 1: Get signed upload URL
    onProgress?.(5);
    const uploadData = await this.getUploadUrl(file.name, file.type, file.size);

    // Step 2: Upload to Cloudinary temp folder
    onProgress?.(10);
    const result = await this.uploadToCloudinary(file, uploadData, (cloudinaryProgress) => {
      // Map cloudinary progress (0-100) to overall progress (10-95)
      const mapped = 10 + Math.round(cloudinaryProgress * 0.85);
      onProgress?.(mapped);
    });

    onProgress?.(100);
    return result;
  }

  /**
   * Step 3: Confirm upload with backend (move temp → permanent + generate code)
   */
  async confirmUpload(
    cloudinaryUrl: string,
    file: File,
    options: FileUploadOptions,
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
   * Complete upload flow (fallback when no pre-upload was done)
   */
  async uploadFile(
    file: File,
    options: FileUploadOptions,
    onProgress?: (_p: number) => void,
    preUploadData?: PreUploadResult,
  ): Promise<UploadConfirmResponse> {
    let secureUrl: string;
    let resourceType: string;
    let publicId: string;

    if (preUploadData) {
      // Pre-upload already done — skip steps 1+2
      secureUrl = preUploadData.secureUrl;
      resourceType = preUploadData.resourceType;
      publicId = preUploadData.publicId;
      onProgress?.(80);
    } else {
      // Fallback: full 3-step flow
      onProgress?.(10);
      const uploadData = await this.getUploadUrl(
        file.name,
        file.type,
        file.size,
      );

      onProgress?.(30);
      const result = await this.uploadToCloudinary(file, uploadData);
      secureUrl = result.secureUrl;
      resourceType = result.resourceType;
      publicId = result.publicId;
      onProgress?.(80);
    }

    // Step 3: Confirm with backend
    const result = await this.confirmUpload(secureUrl, file, {
      ...options,
      resourceType,
      tempPublicId: publicId,
    });

    onProgress?.(100);
    return result;
  }

  /**
   * Get file information by code
   */
  async getFileInfo(code: string): Promise<FileInfo> {
    const response = await axiosInstance.get<ApiResponse<FileInfo>>(
      `/files/file/${code}`,
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
      },
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
      `/files/file/${fileId}`,
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Delete failed");
    }
  }
}

const fileApiService = new FileApiService();
export default fileApiService;
