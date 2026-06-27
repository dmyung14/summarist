import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import libraryReducer from "./slices/librarySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      library: libraryReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
