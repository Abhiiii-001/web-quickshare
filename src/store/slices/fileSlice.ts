import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fileApiService, { PreUploadResult } from "@/services/fileApi";
import {
  FileUploadOptions,
  FileInfo,
} from "@/types/api";
import { handleApiError } from "@/libs/axios/errorHandler";
import { AxiosError } from "axios";

interface FileState {
  selectedFile: File | null;
  uploadProgress: number;
  uploadedFileCode: string | null;
  uploadedFileExpiry: string | null;
  fileInfo: FileInfo | null;
  downloadUrl: string | null;
  downloadFilename: string | null; // For the direct download flow
  isUploading: boolean;
  isDownloading: boolean;
  isFetchingInfo: boolean;
  error: string | null;
  
  // @deprecated Eager pre-upload state (for direct-to-bucket flow)
  preUploadData: PreUploadResult | null;
  isPreUploading: boolean;
  preUploadProgress: number;
  preUploadError: string | null;
}

const initialState: FileState = {
  selectedFile: null,
  uploadProgress: 0,
  uploadedFileCode: null,
  uploadedFileExpiry: null,
  fileInfo: null,
  downloadUrl: null,
  downloadFilename: null,
  isUploading: false,
  isDownloading: false,
  isFetchingInfo: false,
  error: null,
  
  // @deprecated Eager pre-upload state
  preUploadData: null,
  isPreUploading: false,
  preUploadProgress: 0,
  preUploadError: null,
};

// Async thunks

/**
 * @deprecated Use uploadFileDirect instead.
 * Pre-upload: Eagerly upload file to Cloudinary temp folder on file selection.
 * This runs steps 1+2 (get signed URL + upload to Cloudinary) in the background.
 */
export const preUploadFile = createAsyncThunk(
  "file/preUpload",
  async (file: File, { rejectWithValue, dispatch }) => {
    try {
      const result = await fileApiService.preUpload(file, (progress) => {
        dispatch(setPreUploadProgress(progress));
      });
      return result;
    } catch (error) {
      const apiError = handleApiError(error);
      return rejectWithValue(apiError.message);
    }
  }
);

/**
 * @deprecated Use uploadFileDirect instead.
 * Upload file: If pre-upload data exists, only does step 3 (confirm + move).
 * Otherwise falls back to full 3-step flow.
 */
export const uploadFile = createAsyncThunk(
  "file/upload",
  async (
    { file, options }: { file: File; options: FileUploadOptions },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const state = getState() as { file: FileState };
      const preUploadData = state.file.preUploadData ?? undefined;

      const result = await fileApiService.uploadFile(
        file,
        options,
        (progress) => {
          dispatch(setUploadProgress(progress));
        },
        preUploadData,
      );
      return result;
    } catch (error) {
      const apiError = handleApiError(error);
      return rejectWithValue(apiError.message);
    }
  }
);

/**
 * New Direct Upload Thunk
 * Uploads file directly to backend proxy (automatically compresses if beneficial)
 */
export const uploadFileDirect = createAsyncThunk(
  "file/uploadDirect",
  async (
    { file, options }: { file: File; options: FileUploadOptions },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const result = await fileApiService.uploadFileDirect(
        file,
        options,
        (progress) => {
          dispatch(setUploadProgress(progress));
        },
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

/**
 * @deprecated Use downloadFileDirect instead.
 */
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

/**
 * New Direct Download Thunk
 * Fetches file from proxy, decompresses if necessary, and returns an Object URL.
 */
export const downloadFileDirect = createAsyncThunk(
  "file/downloadDirect",
  async (
    { code, password }: { code: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const { blob, filename } = await fileApiService.downloadFileDirect(code, password);
      const objectUrl = window.URL.createObjectURL(blob);
      return { objectUrl, filename };
    } catch (error: any) {
      // Parse blob error response if Axios failed with blob responseType
      if (error instanceof AxiosError && error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const parsed = JSON.parse(text);
          return rejectWithValue(parsed.message || "Download failed");
        } catch {
          // ignore
        }
      }
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
    setPreUploadProgress: (state, action: PayloadAction<number>) => {
      state.preUploadProgress = action.payload;
    },
    resetPreUpload: (state) => {
      state.preUploadData = null;
      state.isPreUploading = false;
      state.preUploadProgress = 0;
      state.preUploadError = null;
    },
    resetUpload: (state) => {
      state.selectedFile = null;
      state.uploadProgress = 0;
      state.uploadedFileCode = null;
      state.uploadedFileExpiry = null;
      state.error = null;
      // Also reset pre-upload
      state.preUploadData = null;
      state.isPreUploading = false;
      state.preUploadProgress = 0;
      state.preUploadError = null;
    },
    resetDownload: (state) => {
      state.fileInfo = null;
      if (state.downloadUrl && state.downloadUrl.startsWith("blob:")) {
        window.URL.revokeObjectURL(state.downloadUrl);
      }
      state.downloadUrl = null;
      state.downloadFilename = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Pre-upload file (eager upload on file selection)
    builder
      .addCase(preUploadFile.pending, (state) => {
        state.isPreUploading = true;
        state.preUploadProgress = 0;
        state.preUploadError = null;
        state.preUploadData = null;
      })
      .addCase(preUploadFile.fulfilled, (state, action) => {
        state.isPreUploading = false;
        state.preUploadData = action.payload;
        state.preUploadProgress = 100;
      })
      .addCase(preUploadFile.rejected, (state, action) => {
        state.isPreUploading = false;
        state.preUploadError = action.payload as string;
        state.preUploadProgress = 0;
      });

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

    // Upload file direct
    builder
      .addCase(uploadFileDirect.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(uploadFileDirect.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadedFileCode = action.payload.code;
        state.uploadedFileExpiry = action.payload.expiresAt;
        state.uploadProgress = 100;
      })
      .addCase(uploadFileDirect.rejected, (state, action) => {
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

    // Download file (deprecated)
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

    // Download file direct
    builder
      .addCase(downloadFileDirect.pending, (state) => {
        state.isDownloading = true;
        state.error = null;
      })
      .addCase(downloadFileDirect.fulfilled, (state, action) => {
        state.isDownloading = false;
        state.downloadUrl = action.payload.objectUrl;
        state.downloadFilename = action.payload.filename;
      })
      .addCase(downloadFileDirect.rejected, (state, action) => {
        state.isDownloading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedFile,
  setUploadProgress,
  setPreUploadProgress,
  resetPreUpload,
  resetUpload,
  resetDownload,
  clearError,
} = fileSlice.actions;

export default fileSlice.reducer;
