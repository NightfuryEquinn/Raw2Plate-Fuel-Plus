import { ImageSourcePropType } from "react-native"
import { Category } from "./groceryCategory"

export type GroceryItemCategory = {
  source: ImageSourcePropType,
  name: string,
  price: number,
  category: Category
}

export const groceryItemCategory: GroceryItemCategory[] = [
  {
    source: require( "../assets/images/grocery_hardcoded/anchor_cheddar_slice.jpg" ),
    name: "Anchor Cheddar Cheese Slices (12 pieces)",
    price: 12.5,
    category: Category.Dairy
  },
  {
    source: require( "../assets/images/grocery_hardcoded/black_beer.jpg" ),
    name: "Black Beer (1 can)",
    price: 7.5,
    category: Category.Nonhalal
  },
  {
    source: require( "../assets/images/grocery_hardcoded/cadbury_oreo_chocolate.jpeg" ),
    name: "Cadbury Oreo Chocolate",
    price: 4.5,
    category: Category.Snacks
  },
  {
    source: require( "../assets/images/grocery_hardcoded/carrot.jpg" ),
    name: "Carrot (per pack)",
    price: 2.9,
    category: Category.Fresh
  },
  {
    source: require( "../assets/images/grocery_hardcoded/cornflakes.jpeg" ),
    name: "Kellogg's Cornflakes",
    price: 11.20,
    category: Category.Organic
  },
  {
    source: require( "../assets/images/grocery_hardcoded/farm_fresh.jpg" ),
    name: "Farm Fresh Milk",
    price: 16.5,
    category: Category.Dairy
  },
  {
    source: require( "../assets/images/grocery_hardcoded/flour.jpeg" ),
    name: "Flour (per pack)",
    price: 1.9,
    category: Category.Essentials
  },
  {
    source: require( "../assets/images/grocery_hardcoded/gardenia_quick_bites.png" ),
    name: "Gardenia Quick Bites Chocolate",
    price: 4.9,
    category: Category.Bread
  },
  {
    source: require( "../assets/images/grocery_hardcoded/gardenia.jpg" ),
    name: "Gardenia Classic Loaf",
    price: 3.8,
    category: Category.Bread
  },
  {
    source: require( "../assets/images/grocery_hardcoded/glutinous_flour.jpg" ),
    name: "Glutinous Flour (per pack)",
    price: 3.4,
    category: Category.Essentials
  },
  {
    source: require( "../assets/images/grocery_hardcoded/heineken.jpg" ),
    name: "Heineken (1 can)",
    price: 6.9,
    category: Category.Nonhalal
  },
  {
    source: require( "../assets/images/grocery_hardcoded/homesoy.jpg" ),
    name: "Homesoy",
    price: 3.9,
    category: Category.Dairy
  },
  {
    source: require( "../assets/images/grocery_hardcoded/honey_stars.jpg" ),
    name: "Nestle Honey Stars",
    price: 11.5,
    category: Category.Organic
  },
  {
    source: require( "../assets/images/grocery_hardcoded/knife_oil.jpg" ),
    name: "Knife Oil",
    price: 8.5,
    category: Category.Essentials
  },
  {
    source: require( "../assets/images/grocery_hardcoded/kokokrunch.jpg" ),
    name: "Nestle Koko Krunch",
    price: 12.30,
    category: Category.Organic
  },
  {
    source: require( "../assets/images/grocery_hardcoded/laughing_cow_cheese.jpg" ),
    name: "Lauging Cow Cheese (8 slices)",
    price: 14.20,
    category: Category.Dairy
  },
  {
    source: require( "../assets/images/grocery_hardcoded/lays_classic.jpg" ),
    name: "Lays Classic Flavour",
    price: 8.5,
    category: Category.Snacks
  },
  {
    source: require( "../assets/images/grocery_hardcoded/lays_cream_onion.jpg" ),
    name: "Lays Amerian Garlic Cream and Onion Flavour",
    price: 11.50,
    category: Category.Snacks
  },
  {
    source: require( "../assets/images/grocery_hardcoded/massimo.jpg" ),
    name: "Massimo Wheat Loaf",
    price: 3.8,
    category: Category.Bread
  },
  {
    source: require( "../assets/images/grocery_hardcoded/mighty_white.jpg" ),
    name: "Mighty White Classic Loaf",
    price: 4.3,
    category: Category.Bread
  },
  {
    source: require( "../assets/images/grocery_hardcoded/oreo_original.png" ),
    name: "Oreo Original",
    price: 3.6,
    category: Category.Snacks
  },
  {
    source: require( "../assets/images/grocery_hardcoded/pizza_bread_stick.jpeg" ),
    name: "Pizza Breadstick",
    price: 2.8,
    category: Category.Bread
  },
  {
    source: require( "../assets/images/grocery_hardcoded/red_onion.jpg" ),
    name: "Red Onion (per kg)",
    price: 4.8,
    category: Category.Fresh
  },
  {
    source: require( "../assets/images/grocery_hardcoded/romaine_lettuce.jpg" ),
    name: "Romaine Lettuce (per pack)",
    price: 4.9,
    category: Category.Fresh
  },
  {
    source: require( "../assets/images/grocery_hardcoded/soju.jpg" ),
    name: "Soju (1 bottle)",
    price: 6.9,
    category: Category.Nonhalal
  },
]