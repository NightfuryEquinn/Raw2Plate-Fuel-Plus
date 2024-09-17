import { ImageSourcePropType } from "react-native"

export type NutrientCategory = {
  source: ImageSourcePropType
  label: string
  measurement: string
  total?: number
}

export const nutrientCategory: NutrientCategory[] = [
  {
    source: require( "../assets/images/nutrients/alcohol.png" ),
    label: "Alcohol",
    measurement: "g"
  },
  {
    source: require( "../assets/images/nutrients/caffeine.png" ),
    label: "Caffeine",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/carb.png" ),
    label: "Carbohydrates",
    measurement: "g"
  },
  {
    source: require( "../assets/images/nutrients/cholesterol.png" ),
    label: "Cholesterol",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/fat.png" ),
    label: "Fat",
    measurement: "g"
  },
  {
    source: require( "../assets/images/nutrients/fiber.png" ),
    label: "Fiber",
    measurement: "g"
  },
  {
    source: require( "../assets/images/nutrients/protein.png" ),
    label: "Protein",
    measurement: "g"
  },
  {
    source: require( "../assets/images/nutrients/sugar.png" ),
    label: "Sugar",
    measurement: "g"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Copper",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Calcium",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Choline",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Fluoride",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Iodine",
    measurement: "mcg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Iron",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Magnesium",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Managenese",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Phosphorus",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Potassium",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Selenium",
    measurement: "mcg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Sodium",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/mineral.png" ),
    label: "Zinc",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin A",
    measurement: "IU"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin C",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin D",
    measurement: "mcg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin E",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin K",
    measurement: "mcg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin B1",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin B2",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin B3",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin B5",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin B6",
    measurement: "mg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Folate",
    measurement: "mcg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Folic Acid",
    measurement: "mcg"
  },
  {
    source: require( "../assets/images/nutrients/vitamin.png" ),
    label: "Vitamin B12",
    measurement: "mg"
  },
]