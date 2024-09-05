export interface User {
  userId: number,
  username: string,
  password: string,
  image: string | undefined,
  email: string,
  contact: string | undefined,
  dateOfBirth: string | undefined,
  height: number | undefined,
  weight: number | undefined,
  age: number | undefined,
  registeredDate: string,
  isDarkMode: boolean,
  isAppleAuth: boolean,
  isGoogleAuth: boolean
}