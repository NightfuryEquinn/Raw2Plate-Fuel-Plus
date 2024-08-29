import { LightMode } from "assets/colors/LightMode"

export type MethodCategory = {
  iconName: string,
  color: string,
  placeholder: string
}

export const methodCategory: MethodCategory[] = [
  {
    iconName: "cc-visa",
    color: LightMode.visaBlue,
    placeholder: "4123 **** **** ****"
  },
  {
    iconName: "cc-mastercard",
    color: LightMode.masterOrange,
    placeholder: "5638 **** **** ****"
  },
  {
    iconName: "cc-amex",
    color: LightMode.americanBlue,
    placeholder: "3782 ****** *****"
  }
]