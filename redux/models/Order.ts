export enum Status {
  pending = "Pending",
  active = "Delivering",
  inactive = "Completed",
  cancel = "Cancelled"
}

export const drivers: string[] = [
  "John Doe",
  "Alexandar Xavier",
  "Yggdrasil Wright",
  "Thor Amellia",
  "Zeus Almighty"
]

export interface Order {
  orderId: number,
  receiver: string,
  contact: string,
  address: string,
  totalPrice: number,
  paidWith: string,
  status: Status,
  date: string,
  orderTime: string,
  deliveredTime: string,
  driver: string,
  userId: number | undefined
}