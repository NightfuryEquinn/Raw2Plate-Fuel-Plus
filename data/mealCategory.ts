import { ImageSourcePropType } from "react-native";

export type MealCategory = {
  source: ImageSourcePropType;
  label: string;
};

export const mealCategories: MealCategory[] = [
  { source: require( "../assets/images/breakfast.jpg" ), label: "Breakfast" },
  { source: require( "../assets/images/brunch.jpg" ), label: "Brunch" },
  { source: require( "../assets/images/lunch.jpg" ), label: "Lunch" },
  { source: require( "../assets/images/teatime.jpg" ), label: "Tea Time" },
  { source: require( "../assets/images/dinner.jpg" ), label: "Dinner" },
]