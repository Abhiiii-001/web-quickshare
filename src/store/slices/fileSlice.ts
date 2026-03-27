import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fileApiService from "@/services/fileApi";
import {
  FileUploadOptions,
  UploadConfirmResponse,
  FileInfo,
} from "@/types/api";
import { handleApiError } from "@/libs/axios/errorHandler";

interface FileState {
  selectedFile: File | null;
  uploadProgress: number;
  uploadedFileCode: string | null;
  uploadedFileExpiry: string | null;
  fileInfo: FileInfo | null;
  downloadUrl: string | null;
  isUploading: boolean;
  isDownloading: boolean;
  isFetchingInfo: boolean;
  error: string | null;
}

const initialState: FileState = {
  selectedFile: null,
  uploadProgress: 0,
  uploadedFileCode: null,
  uploadedFileExpiry: null,
  fileInfo: null,
  downloadUrl: null,
  isUploading: false,
  isDownloading: false,
  isFetchingInfo: false,
  error: null,
};

// Async thunks
export const uploadFile = createAsyncThunk(
  "file/upload",
  async (
    { file, options }: { file: File; options: FileUploadOptions },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const result = await fileApiService.uploadFile(
        file,
        options,
        (progress) => {
          dispatch(setUploadProgress(progress));
        }
      );
      return result;
    } catch (error) {
      const apiError = handleApiError(error);
      return rejectWithValue(apiError.message);
    }
  }
);

export const fetchFileInfo = createAsyncThunk(
  "file/fetchInfo",
  async (code: string, { rejectWithValue }) => {
    try {
      const result = await fileApiService.getFileInfo(code);
      return result;
    } catch (error) {
      const apiError = handleApiError(error);
      return rejectWithValue(apiError.message);
    }
  }
);

export const downloadFile = createAsyncThunk(
  "file/download",
  async (
    { code, password }: { code: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const url = await fileApiService.downloadFile(code, password);
      return url;
    } catch (error) {
      const apiError = handleApiError(error);
      return rejectWithValue(apiError.message);
    }
  }
);

// Slice
const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<File | null>) => {
      state.selectedFile = action.payload;
      state.error = null;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    resetUpload: (state) => {
      state.selectedFile = null;
      state.uploadProgress = 0;
      state.uploadedFileCode = null;
      state.uploadedFileExpiry = null;
      state.error = null;
    },
    resetDownload: (state) => {
      state.fileInfo = null;
      state.downloadUrl = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Upload file
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadedFileCode = action.payload.code;
        state.uploadedFileExpiry = action.payload.expiresAt;
        state.uploadProgress = 100;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.payload as string;
        state.uploadProgress = 0;
      });

    // Fetch file info
    builder
      .addCase(fetchFileInfo.pending, (state) => {
        state.isFetchingInfo = true;
        state.error = null;
      })
      .addCase(fetchFileInfo.fulfilled, (state, action) => {
        state.isFetchingInfo = false;
        state.fileInfo = action.payload;
      })
      .addCase(fetchFileInfo.rejected, (state, action) => {
        state.isFetchingInfo = false;
        state.error = action.payload as string;
      });

    // Download file
    builder
      .addCase(downloadFile.pending, (state) => {
        state.isDownloading = true;
        state.error = null;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.isDownloading = false;
        state.downloadUrl = action.payload;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.isDownloading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedFile,
  setUploadProgress,
  resetUpload,
  resetDownload,
  clearError,
} = fileSlice.actions;

export default fileSlice.reducer;
