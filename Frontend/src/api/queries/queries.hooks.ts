import { useQuery } from "@tanstack/react-query";
import { queriesKeys } from "./queries.keys";
import {
   APIGetAllCars,
   APIGetAllOrders,
   APIGetCarById,
   APIGetCurrentUser,
   APIGetCurrentUserOrder,
   APIGetOrderById
} from "./queries";

// Auth
export const useCurrentUser = () => {
   return useQuery({
      queryKey: queriesKeys.currentUser,
      queryFn: () => APIGetCurrentUser()
   });
};

// Cars
export const useAllCarsQuery = () => {
   return useQuery({
      queryKey: queriesKeys.cars,
      queryFn: () => APIGetAllCars()
   });
};

export const useCarQuery = (id: string) => {
   return useQuery({
      queryKey: queriesKeys.car(id),
      queryFn: () => APIGetCarById(id)
   });
};

// Orders
export const useCurrentUserOrder = () => {
   return useQuery({
      queryKey: queriesKeys.currentUserOrder,
      queryFn: () => APIGetCurrentUserOrder()
   });
};

export const useAllOrdersQuery = () => {
   return useQuery({
      queryKey: queriesKeys.orders,
      queryFn: () => APIGetAllOrders()
   });
};

export const useOrderQuery = (id: string) => {
   return useQuery({
      queryKey: queriesKeys.order(id),
      queryFn: () => APIGetOrderById(id)
   });
};
