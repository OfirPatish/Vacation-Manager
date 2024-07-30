import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthReducer";

const rootReducer = combineReducers({ auth: authReducer });

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
