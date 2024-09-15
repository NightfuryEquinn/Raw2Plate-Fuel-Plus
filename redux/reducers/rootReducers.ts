import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { recipeReducer } from "./recipeReducer";
import { grcoeryReducer } from "./grcoeryReducer";
import { trackerReducer } from "./trackerReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  grocery: grcoeryReducer,
  tracker: trackerReducer
})

export type AppState = ReturnType<typeof rootReducer>