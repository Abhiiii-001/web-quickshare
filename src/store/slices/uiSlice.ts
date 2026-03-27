import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface UiState {
  toasts: Toast[];
  mode: "send" | "receive";
  showCodeDisplay: boolean;
}

const initialState: UiState = {
  toasts: [],
  mode: "send",
  showCodeDisplay: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const id = Date.now().toString();
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    setMode: (state, action: PayloadAction<"send" | "receive">) => {
      state.mode = action.payload;
      state.showCodeDisplay = false;
    },
    setShowCodeDisplay: (state, action: PayloadAction<boolean>) => {
      state.showCodeDisplay = action.payload;
    },
  },
});

export const { addToast, removeToast, setMode, setShowCodeDisplay } =
  uiSlice.actions;

export default uiSlice.reducer;
