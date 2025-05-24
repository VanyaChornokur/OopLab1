import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "~/components/Layout";
import { routes } from "~/global/config/routes";
import { Home } from "~/pages/Home.page";
import { Login } from "~/pages/Login.page";
import { Signup } from "~/pages/Signup.page";
import { AdminRoutes, AuthRoutes } from "./AuthRoutes";
import { NotFound } from "~/pages/error/NotFound.page";
import { NotAllowed } from "~/pages/error/NotAllowed.page";
import { Account } from "~/pages/Account.page";
import { Orders } from "~/pages/Orders.page";
import { CreateCar } from "~/pages/CreateCar.page";

const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: routes.home,
            element: <Home />
         },
         {
            path: routes.login,
            element: <Login />
         },
         {
            path: routes.signup,
            element: <Signup />
         },

         {
            element: <AuthRoutes />,
            children: [
               { path: routes.account, element: <Account /> },
               {
                  element: <AdminRoutes />,
                  children: [
                     { path: routes.orders, element: <Orders /> },
                     { path: routes.createCar, element: <CreateCar /> }
                  ]
               }
            ]
         },
         {
            path: routes.notAllowed,
            element: <NotAllowed />
         },
         {
            path: routes.notFound,
            element: <NotFound />
         },
         {
            path: "*",
            element: <NotFound />
         }
      ]
   }
]);

function AppRouter() {
   return <RouterProvider router={router} />;
}

export { AppRouter };
