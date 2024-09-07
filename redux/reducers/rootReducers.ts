import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { recipeReducer } from "./recipeReducer";
import { grcoeryReducer } from "./grcoeryReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  grocery: grcoeryReducer
})

export type AppState = ReturnType<typeof rootReducer>