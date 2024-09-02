export interface Meal {
  MealId: number,
  MealType: string,
  RecipeId: number,
  PlannerId: number | undefined,
  TrackerId: number | undefined
}