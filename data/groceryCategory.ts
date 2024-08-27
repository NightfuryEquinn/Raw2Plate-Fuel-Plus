import { ImageSourcePropType } from "react-native"

export enum Category {
  Beverages = "Beverages",
  Bread = "Bread",
  Dairy = "Dairy",
  Essentials = "Essentials",
  Fresh = "Fresh",
  Frozen = "Frozen",
  Nonhalal = "Non-halal",
  Organic = "Organic",
  Snacks = "Snacks"
}

export type GroceryCategory = {
  source: ImageSourcePropType,
  label: Category
}

export const groceryCategory: GroceryCategory[] = [
  {
    source: require( "../assets/images/icons/beverages.png" ),
    label: Category.Beverages
  },
  {
    source: require( "../assets/images/icons/bread.png" ),
    label: Category.Bread
  },
  {
    source: require( "../assets/images/icons/dairy.png" ),
    label: Category.Dairy
  },
  {
    source: require( "../assets/images/icons/essentials.png" ),
    label: Category.Essentials
  },
  {
    source: require( "../assets/images/icons/fresh.png" ),
    label: Category.Fresh
  },
  {
    source: require( "../assets/images/icons/frozen.png" ),
    label: Category.Frozen
  },
  {
    source: require( "../assets/images/icons/non_halal.png" ),
    label: Category.Nonhalal
  },
  {
    source: require( "../assets/images/icons/organic.png" ),
    label: Category.Organic
  },
  {
    source: require( "../assets/images/icons/snacks.png" ),
    label: Category.Snacks
  },
]