import { useMutation } from "@tanstack/react-query";
import {
   APICreateCar,
   APICreateOrder,
   APILogin,
   APILogout,
   APIPatchOrder,
   APISignup
} from "./mutations";
import { useInvalidateQuery } from "../useInvalidateQuery";
import { queriesKeys } from "../queries/queries.keys";

const useAuthMutation = <T>(APIAuthFunction: (data: T) => Promise<null>) => {
   const { invalidateQ } = useInvalidateQuery();
   return useMutation({
      mutationFn: APIAuthFunction,
      onSuccess: () => {
         invalidateQ(queriesKeys.currentUser);
      }
   });
};

// Auth
export const useLoginMutation = () => {
   return useAuthMutation(APILogin);
};

export const useSignupMutation = () => {
   return useAuthMutation(APISignup);
};

export const useLogoutMutation = () => {
   return useAuthMutation<null>(APILogout);
};

// Cars
export const useCreateCarMutation = () => {
   const { invalidateQ } = useInvalidateQuery();

   return useMutation({
      mutationFn: APICreateCar,
      onSuccess: () => {
         invalidateQ(queriesKeys.cars);
      }
   });
};

// Orders
export const useCreateOrderMutation = () => {
   const { invalidateQ } = useInvalidateQuery();
   return useMutation({
      mutationFn: APICreateOrder,
      onSuccess: () => {
         invalidateQ(queriesKeys.currentUserOrder);
         invalidateQ(queriesKeys.orders);
      }
   });
};

// Orders
export const usePatchOrderMutation = () => {
   const { invalidateQ } = useInvalidateQuery();

   return useMutation({
      mutationFn: APIPatchOrder,
      onSuccess: () => {
         invalidateQ(queriesKeys.orders);
      }
   });
};
