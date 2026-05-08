export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface FileUploadOptions {
  expiry: string;
  downloads: number;
  usePassword: boolean;
  password?: string;
  resourceType?: string;
  tempPublicId?: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  publicId: string;
  folder: string;
}

export interface UploadConfirmResponse {
  code: string;
  expiresAt: string;
}

export interface FileInfo {
  id: string;
  code: string;
  originalName: string;
  size: number;
  expiresAt: string;
  maxDownloads: number;
  downloadCount: number;
}

export interface DownloadResponse {
  url: string;
}
