import type { Car, Order, User } from "../types";
import { API } from "../api.config";

// Auth
export const APIGetCurrentUser = (): Promise<User> =>
   API.get("/current-user").then((res) => res.data);

// Cars
export const APIGetAllCars = (): Promise<Car[]> =>
   API.get("cars").then((res) => res.data);

export const APIGetCarById = (id: string): Promise<Car> =>
   API.get(`cars/${id}`).then((res) => res.data);

// Orders
export const APIGetCurrentUserOrder = (): Promise<Order> =>
   API.get("/current-user-order").then((res) => res.data);

export const APIGetAllOrders = (): Promise<Order[]> =>
   API.get(`/orders`).then((res) => res.data);

export const APIGetOrderById = (id: string): Promise<Order> =>
   API.get(`/orders/${id}`).then((res) => res.data);
