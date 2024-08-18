import { ImageSourcePropType } from "react-native";

export type MealCategory = {
  source: ImageSourcePropType
  label: string
  abbr: string
};

export const mealCategories: MealCategory[] = [
  { 
    source: require( "../assets/images/placeholders/breakfast.jpg" ), 
    label: "Breakfast",
    abbr: "BKF"
  },
  { 
    source: require( "../assets/images/placeholders/brunch.jpg" ), 
    label: "Brunch",
    abbr: "BRU"
  },
  { 
    source: require( "../assets/images/placeholders/lunch.jpg" ), 
    label: "Lunch",
    abbr: "LUN"
  },
  { 
    source: require( "../assets/images/placeholders/teatime.jpg" ), 
    label: "Tea Time",
    abbr: "TEA"
  },
  { 
    source: require( "../assets/images/placeholders/dinner.jpg" ), 
    label: "Dinner",
    abbr: "DIN"
  },
]