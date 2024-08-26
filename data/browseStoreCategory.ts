import { ImageSourcePropType } from "react-native";

export type BrowseStoreCategory = {
  image: ImageSourcePropType
  store: string
  distance: number
}

export const browseStoreCategories: BrowseStoreCategory[] = [
  {
    image: require( "../assets/images/grocery_hardcoded/aeon.jpg" ),
    store: "Aeon Mall",
    distance: 9.9
  },
  {
    image: require( "../assets/images/grocery_hardcoded/food_merchant.jpg" ),
    store: "Food Merchant",
    distance: 4.3
  },
  {
    image: require( "../assets/images/grocery_hardcoded/jaya_grocer.jpg" ),
    store: "Jaya Grocer",
    distance: 5.7
  },
  {
    image: require( "../assets/images/grocery_hardcoded/lotus.jpg" ),
    store: "Lotus's",
    distance: 12.6
  },
  {
    image: require( "../assets/images/grocery_hardcoded/the_store.jpg" ),
    store: "The Store",
    distance: 15.3
  },
  {
    image: require( "../assets/images/grocery_hardcoded/nsk.jpg" ),
    store: "NSK Trade City",
    distance: 2.5
  }
]