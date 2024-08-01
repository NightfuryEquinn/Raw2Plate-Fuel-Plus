import { ImageSourcePropType } from "react-native";

export type ForCalendarOverview = {
  id: number,
  image: ImageSourcePropType,
  heading: string,
  sub: string,
  desc: string
}

export type ForViewCalendar = {
  id: number,
  image: ImageSourcePropType,
  heading: string
}

export type ForRecipeManager = {
  id: number,
  image: ImageSourcePropType,
  meal: string,
  heading: string,
  date: string
}

export const forCalendarOverview: ForCalendarOverview[] = [
  {
    "id": 1,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 2,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 3,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 4,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 5,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 6,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
]

export const forViewCalendar: ForViewCalendar[] = [
  {
    "id": 1,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 2,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 3,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 4,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 5,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 6,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
]

export const forRecipeManager: ForRecipeManager[] = [
  {
    "id": 1,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "Breakfast",
    "date": "29-07-2024"
  },
  {
    "id": 2,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "Breakfast",
    "date": "31-07-2024"
  },
  {
    "id": 3,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "Lunch",
    "date": "31-07-2024"
  },
  {
    "id": 4,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "Lunch",
    "date": "31-07-2024"
  },
]