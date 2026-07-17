import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./slices/fileSlice";
import uiReducer from "./slices/uiSlice";
import modalReducer from "./slices/modalSlice";
import portalReducer from "./slices/portalSlice";

export const store = configureStore({
  reducer: {
    file: fileReducer,
    ui: uiReducer,
    modal: modalReducer,
    portal: portalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: ["file/setSelectedFile", "file/preUpload"],
        ignoredPaths: ["file.selectedFile"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
