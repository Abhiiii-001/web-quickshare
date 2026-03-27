export interface FileUploadData {
  expiry: string;
  downloads: number;
  usePassword: boolean;
  password?: string;
}

export interface ReceiveFileData {
  receiveCode: string;
  receiveUsePassword: boolean;
  receivePassword?: string;
}

export interface ToastType {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}
