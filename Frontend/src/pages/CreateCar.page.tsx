import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, TextField } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { useCreateCarMutation } from "~/api/mutations/mutations.hooks";
import { useNavigate } from "react-router";
import { routes } from "~/global/config/routes";

// Define schema
const carSchema = z.object({
   make: z.string().nonempty("Make is required"),
   model: z.string().nonempty("Model is required"),
   year: z
      .number({ invalid_type_error: "Year must be a number" })
      .int("Year must be an integer")
      .min(1886, "Year must be later than 1885") // first car year
      .max(new Date().getFullYear(), "Year can't be in the future"),
   pricePerDay: z
      .number({ invalid_type_error: "Price must be a number" })
      .positive("Price must be positive")
});

export type CarFormData = z.infer<typeof carSchema>;

function CreateCar() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<CarFormData>({
      resolver: zodResolver(carSchema)
   });

   const { mutateAsync } = useCreateCarMutation();
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<CarFormData> = async (data) => {
      try {
         await mutateAsync(data);
         toast.success("Car submitted successfully!");
         navigate(routes.home, { viewTransition: true });
      } catch (error) {
         toast.error("Something went wrong!");
      }
   };

   return (
      <div className="flex flex-col items-center mt-8">
         <Card
            className="!shrink-0 !grow !w-full !max-w-[450px]"
            style={{ viewTransitionName: "create-car" }}
         >
            <h2 className="text-center mt-4">
               <span
                  className=""
                  style={{
                     viewTransitionName: "create-car-title"
                  }}
               >
                  Create car <i className="pi pi-plus" />
               </span>
            </h2>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="w-full mx-auto p-4 flex flex-col gap-3"
            >
               <label>
                  <p className="font-bold">Make:</p>
                  <TextField.Root {...register("make")} placeholder="Make" />
                  {errors.make && (
                     <small className="text-(--red-9)">
                        {errors.make.message}
                     </small>
                  )}
               </label>

               <label>
                  <p className="font-bold">Model:</p>
                  <TextField.Root {...register("model")} placeholder="Model" />
                  {errors.model && (
                     <small className="text-(--red-9)">
                        {errors.model.message}
                     </small>
                  )}
               </label>

               <label>
                  <p className="font-bold">Year:</p>
                  <TextField.Root
                     {...register("year", { valueAsNumber: true })}
                     placeholder="Year"
                     type="number"
                  />
                  {errors.year && (
                     <small className="text-(--red-9)">
                        {errors.year.message}
                     </small>
                  )}
               </label>

               <label>
                  <p className="font-bold">Price Per Day ($):</p>
                  <TextField.Root
                     {...register("pricePerDay", { valueAsNumber: true })}
                     placeholder="Price Per Day"
                     type="number"
                  />
                  {errors.pricePerDay && (
                     <small className="text-(--red-9)">
                        {errors.pricePerDay.message}
                     </small>
                  )}
               </label>

               <Button loading={isSubmitting}>Submit</Button>
            </form>
         </Card>
      </div>
   );
}

export { CreateCar };
