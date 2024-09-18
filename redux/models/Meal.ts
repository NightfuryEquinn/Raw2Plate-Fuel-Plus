export interface Meal {
  mealId: number,
  mealType: string,
  recipeId: number,
  comment: string,
  plannerId: number | undefined,
  trackerId: number | undefined
}