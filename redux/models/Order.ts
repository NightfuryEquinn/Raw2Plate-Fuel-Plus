export enum Status {
  active = "Delivering",
  inactive = "Completed"
}

export interface Order {
  OrderId: number,
  Receiver: string,
  Contact: string,
  Address: string,
  TotalPrice: number,
  PaidWith: string,
  Status: Status,
  Date: string,
  OrderTime: string,
  DeliveredTime: string,
  Driver: string,
  UserId: number | undefined
}