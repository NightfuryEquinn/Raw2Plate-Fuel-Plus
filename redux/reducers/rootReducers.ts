import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { recipeReducer } from "./recipeReducer";
import { groceryReducer } from "./groceryReducer";
import { trackerReducer } from "./trackerReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  grocery: groceryReducer,
  tracker: trackerReducer
})

export type AppState = ReturnType<typeof rootReducer>