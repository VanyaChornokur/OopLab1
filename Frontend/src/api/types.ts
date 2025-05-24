export type Car = {
   id: number;
   make: string;
   model: string;
   year: number;
   pricePerDay: number;
   isAvailable: boolean;
   currentOrderId?: string;
};

export type User = {
   id: number;
   username: string;
   email: string;
   role: "USER" | "ADMIN";
};

export type Order = {
   id: number;
   carDto: Car;
   userDto: User;
   startDate: string;
   endDate: string;
   status: "pending" | "paid" | "active" | "completed" | "rejected";
   totalPrice: number;
};
