export interface User {
  UserId: number,
  Username: string,
  Password: string,
  Image: string | undefined,
  Email: string,
  Contact: string | undefined,
  DateOfBirth: string | undefined,
  Height: number | undefined,
  Weight: number | undefined,
  Age: number | undefined,
  RegisteredDate: string,
  IsDarkMode: boolean,
  IsAppleAuth: boolean,
  IsGoogleAuth: boolean
}