import { combineReducers } from "redux";
import { fetchReducer } from "./fetchReducer";

export const rootReducer = combineReducers({
  fetch: fetchReducer
})

export type AppState = ReturnType<typeof rootReducer>