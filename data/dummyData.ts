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
  date: string,
  author: string
}

export type ForTimer = {
  id: number,
  heading: string,
  timeInSec: number,
  isRunning: boolean
}

export const forCalendarOverview: ForCalendarOverview[] = [
  {
    "id": 1,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Brill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
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
    "heading": "Drill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
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
    "heading": "Brill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 2,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 3,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Drill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
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
    "heading": "Brill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "BKF",
    "date": "29-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 2,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "BKF",
    "date": "31-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 3,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Drill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "LUN",
    "date": "31-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 4,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "LUN",
    "date": "31-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 5,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "TEA",
    "date": "02-08-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 6,
    "image": require( "../assets/images/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "DIN",
    "date": "02-08-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
]

export const forTimer: ForTimer[] = [
  {
    "id": 1,
    "heading": "Boiling",
    "timeInSec": 360,
    "isRunning": true
  },
  {
    "id": 2,
    "heading": "Baking",
    "timeInSec": 380,
    "isRunning": true
  },
  {
    "id": 3,
    "heading": "Marinating",
    "timeInSec": 1080,
    "isRunning": true
  },
  {
    "id": 4,
    "heading": "Resting Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables",
    "timeInSec": 200,
    "isRunning": true
  },
  {
    "id": 5,
    "heading": "Simmering",
    "timeInSec": 680,
    "isRunning": true
  },
  {
    "id": 6,
    "heading": "Resting",
    "timeInSec": 305,
    "isRunning": true
  },
  {
    "id": 7,
    "heading": "Resting Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables",
    "timeInSec": 1080,
    "isRunning": true
  },
  {
    "id": 8,
    "heading": "Proofing",
    "timeInSec": 455,
    "isRunning": true
  },
]