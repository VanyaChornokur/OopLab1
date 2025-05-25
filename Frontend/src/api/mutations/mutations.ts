import type { LoginData } from "~/pages/Login.page";
import { API } from "../api.config";
import type { SendSignupData } from "~/pages/Signup.page";
import type { Order } from "../types";
import type { CarFormData } from "~/pages/CreateCar.page";

// Auth
export const APILogin = (loginData: LoginData): Promise<null> =>
   API.post("/login", loginData).then((res) => res.data);

export const APISignup = (signupData: SendSignupData): Promise<null> =>
   API.post("/signup", signupData).then((res) => res.data);

export const APILogout = (): Promise<null> =>
   API.get("/logout").then((res) => res.data);

// Cars
export const APICreateCar = (carData: CarFormData): Promise<null> =>
   API.post("/cars", carData).then((res) => res.data);

export const APIDeleteCar = (id: string): Promise<null> =>
   API.delete(`/cars/${id}`).then((res) => res.data);

type OrderData = {
   carId: number;
   startDate: string;
   endDate: string;
   totalPrice: number;
};

// Orders
export const APICreateOrder = (orderData: OrderData): Promise<null> =>
   API.post("/orders", orderData).then((res) => res.data);

export const APIPatchOrder = ({
   id,
   orderStatus
}: {
   id: Order["id"];
   orderStatus: Order["status"];
}): Promise<null> =>
   API.patch(`/orders/${id}`, { status: orderStatus }).then((res) => res.data);
