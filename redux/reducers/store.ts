import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducers";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat( thunk ),
  devTools: true
})

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch