import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { recipeReducer } from "./recipeReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer
})

export type AppState = ReturnType<typeof rootReducer>