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

export type ForMainTracker = {
  id: number,
  name: string,
  meal: string,
  calories: number,
  carbo: number,
  protein: number,
  fibers: number,
  fats: number,
  vitamins: {},
  minerals: {},
  image: ImageSourcePropType,
  date: string,
}

export const forCalendarOverview: ForCalendarOverview[] = [
  {
    "id": 1,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Brill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 2,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 3,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Drill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 4,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 5,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
  {
    "id": 6,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "sub": "Est. Cooking Time", 
    "desc": "30 mins"
  },
]

export const forViewCalendar: ForViewCalendar[] = [
  {
    "id": 1,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Brill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 2,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 3,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Drill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 4,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 5,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
  {
    "id": 6,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
  },
]

export const forRecipeManager: ForRecipeManager[] = [
  {
    "id": 1,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Brill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "BKF",
    "date": "29-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 2,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "BKF",
    "date": "31-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 3,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Drill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "LUN",
    "date": "31-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 4,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "LUN",
    "date": "31-07-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 5,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "heading": "Grill Garlic Salmon with Lemon and Herbs Chilled Frozen Vegetables", 
    "meal": "TEA",
    "date": "02-08-2024",
    "author": "Sacrilegious Anonymous Illegal Horse"
  },
  {
    "id": 6,
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
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

export const forMainTracker: ForMainTracker[] = [
  {
    "id": 1,
    "name": "Grilled Chicken Salad",
    "meal": "BKF", 
    "calories": 350,
    "carbo": 15, 
    "protein": 30, 
    "fibers": 5, 
    "fats": 12, 
    "vitamins": {
      "A": 700, 
      "C": 30, 
      "D": 2, 
    },
    "minerals": {
      "calcium": 50, 
      "iron": 2, 
      "magnesium": 60, 
    },
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "date": "15-08-2024",
  },
  {
    "id": 2,
    "name": "Quinoa & Avocado Bowl",
    "meal": "BRU", 
    "calories": 420,
    "carbo": 55, 
    "protein": 12, 
    "fibers": 10, 
    "fats": 18, 
    "vitamins": {
      "A": 180, 
      "C": 20, 
      "D": 0, 
    },
    "minerals": {
      "calcium": 40, 
      "iron": 3, 
      "magnesium": 90, 
    },
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "date": "15-08-2024",
  },
  {
    "id": 3,
    "name": "Vegetable Stir-Fry",
    "meal": "BRU", 
    "calories": 300,
    "carbo": 40, 
    "protein": 10, 
    "fibers": 8, 
    "fats": 10, 
    "vitamins": {
      "A": 900, 
      "C": 50, 
      "D": 0, 
    },
    "minerals": {
      "calcium": 100, 
      "iron": 4, 
      "magnesium": 80, 
    },
    "image": require( "../assets/images/placeholders/linguine.jpg" ), 
    "date": "16-08-2024",
  },
  {
    "id": 4,
    "name": "Baked Salmon with Asparagus",
    "meal": "LUN", 
    "calories": 450,
    "carbo": 5, 
    "protein": 40, 
    "fibers": 4, 
    "fats": 30, 
    "vitamins": {
      "A": 200, 
      "C": 10, 
      "D": 20, 
    },
    "minerals": {
      "calcium": 20, 
      "iron": 1, 
      "magnesium": 30, 
    },
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "date": "16-08-2024",
  },
  {
    "id": 5,
    "name": "Fruit Smoothie",
    "meal": "DIN", 
    "calories": 250,
    "carbo": 50, 
    "protein": 5, 
    "fibers": 10, 
    "fats": 1, 
    "vitamins": {
      "A": 100, 
      "C": 70, 
      "D": 0, 
    },
    "minerals": {
      "calcium": 150, 
      "iron": 0.5, 
      "magnesium": 20, 
    },
    "image": require( "../assets/images/placeholders/garlic_salmon.jpg" ), 
    "date": "17-08-2024",
  }
]