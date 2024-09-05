export interface GroceryItem {
  groceryItemId: number,
  name: string,
  isCompleted: boolean,
  groceryListId: number | undefined
}