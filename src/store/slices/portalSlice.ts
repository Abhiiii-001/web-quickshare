import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/libs/axios/instance";
import { handleApiError } from "@/libs/axios/errorHandler";

interface PortalState {
  code: string | null;
  language: string;
  content: string;
  isEditable: boolean;
  role: "creator" | "guest" | null;
  activeUsers: number;
  isLoading: boolean;
  error: string | null;
  hasPassword: boolean;
}

const initialState: PortalState = {
  code: null,
  language: "javascript",
  content: "",
  isEditable: false,
  role: null,
  activeUsers: 0,
  isLoading: false,
  error: null,
  hasPassword: false,
};

export const fetchPortalMeta = createAsyncThunk(
  "portal/fetchMeta",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/portals/${code}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch portal");
      }
      return response.data.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return rejectWithValue(apiError.message);
    }
  }
);

const portalSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {
    setPortalState: (state, action: PayloadAction<Partial<PortalState>>) => {
      return { ...state, ...action.payload };
    },
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    updateActiveUsers: (state, action: PayloadAction<number>) => {
      state.activeUsers = action.payload;
    },
    updateSettings: (state, action: PayloadAction<{ isEditable: boolean; language: string }>) => {
      state.isEditable = action.payload.isEditable;
      state.language = action.payload.language;
    },
    resetPortal: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortalMeta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPortalMeta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.code = action.payload.code;
        state.language = action.payload.language;
        state.content = action.payload.content || "";
        state.isEditable = action.payload.isEditable;
        state.hasPassword = action.payload.hasPassword;
      })
      .addCase(fetchPortalMeta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPortalState, updateContent, updateActiveUsers, updateSettings, resetPortal } = portalSlice.actions;

export default portalSlice.reducer;
