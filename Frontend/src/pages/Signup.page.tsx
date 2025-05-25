import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Separator, TextField } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { routes } from "~/global/config/routes";
import { useSignupMutation } from "~/api/mutations/mutations.hooks";

const signUpScheme = z
   .object({
      username: z
         .string()
         .nonempty("Username is not specified")
         .max(30, "Username must be less than 20 characters")
         .min(6, "Username must be at least 6 characters"),
      email: z
         .string()
         .nonempty("Email is not specified")
         .email("Invalid email"),
      password: z
         .string()
         .nonempty("Password is not specified")
         .min(8, "Password must be at least 8 characters")
         .max(50, "Password is too big (max 50 characters)"),
      repeatPassword: z.string().nonempty("Please repeat your password")
   })
   .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"]
   });

export type SignupData = z.infer<typeof signUpScheme>;

export type SendSignupData = Omit<SignupData, "repeatPassword">;

function Signup() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<SignupData>({
      resolver: zodResolver(signUpScheme)
   });
   const navigate = useNavigate();

   const { mutateAsync } = useSignupMutation();

   const onSubmit: SubmitHandler<SignupData> = async ({repeatPassword, ...data}) => {
      try {
         await mutateAsync(data);
         navigate(routes.account, { viewTransition: true });
      } catch (err) {
         toast.error(JSON.stringify(err));
      }
   };

   return (
      <>
         <h1 className="containerX text-center mt-20">Signup</h1>
         <section className="containerX">
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="max-w-[450px] mx-auto p-4 flex flex-col gap-3"
            >
               <label>
                  <p className="font-bold">Username:</p>
                  <TextField.Root
                     {...register("username")}
                     placeholder="Username"
                  />
                  {errors.username && (
                     <small className="text-(--red-9)">
                        {errors.username.message}
                     </small>
                  )}
               </label>
               <label>
                  <p className="font-bold">Email:</p>
                  <TextField.Root {...register("email")} placeholder="Email" />
                  {errors.email && (
                     <small className="text-(--red-9)">
                        {errors.email.message}
                     </small>
                  )}
               </label>

               <label>
                  <p className="font-bold">Password:</p>
                  <TextField.Root
                     {...register("password")}
                     placeholder="Password"
                     type="password"
                  />
                  {errors.password && (
                     <small className="text-(--red-9)">
                        {errors.password.message}
                     </small>
                  )}
               </label>
               <label>
                  <p className="font-bold">Repeat Password:</p>
                  <TextField.Root
                     {...register("repeatPassword")}
                     placeholder="Password"
                     type="password"
                  />
                  {errors.repeatPassword && (
                     <small className="text-(--red-9)">
                        {errors.repeatPassword.message}
                     </small>
                  )}
               </label>
               <Button loading={isSubmitting}>Submit</Button>
            </form>
            <div className="max-w-[450px] mx-auto px-4 flex flex-col gap-3">
               <p className="text-center">
                  Already have an account{" "}
                  <Link
                     to={routes.login}
                     className="text-(--accent-10) hover:text-(--accent-11)"
                     viewTransition
                  >
                     Log in
                  </Link>
               </p>
               <Separator className="!w-full" />
               <p className="text-center">Sign in with other providers:</p>
               <div className="flex gap-2 justify-center">
                  <a href={``}>
                     <Button variant="soft" color="gray">
                        Google <i className="pi pi-google"></i>
                     </Button>
                  </a>
                  <a href={``}>
                     <Button variant="soft" color="gray">
                        Github <i className="pi pi-github"></i>
                     </Button>
                  </a>
               </div>
            </div>
         </section>
      </>
   );
}

export { Signup };
