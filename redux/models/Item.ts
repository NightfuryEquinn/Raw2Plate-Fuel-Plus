export interface Item {
  itemId: number,
  name: string,
  category: string,
  image: string,
  price: number,
  description: string,
  storeId: number | undefined
}