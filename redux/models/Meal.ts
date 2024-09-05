export interface Meal {
  mealId: number,
  mealType: string,
  recipeId: number,
  plannerId: number | undefined,
  trackerId: number | undefined
}