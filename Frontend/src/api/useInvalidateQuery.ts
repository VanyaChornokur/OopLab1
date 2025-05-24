import { useQueryClient, type QueryKey } from "@tanstack/react-query";

export const useInvalidateQuery = () => {
   const queryClient = useQueryClient();
   const invalidateQ = (queryKey: QueryKey) => {
      queryClient.invalidateQueries({ queryKey });
   };
   return { invalidateQ };
};
