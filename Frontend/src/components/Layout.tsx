import { Avatar, Button, Spinner } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
   useCurrentUser,
   useCurrentUserOrder
} from "~/api/queries/queries.hooks";
import { routes } from "~/global/config/routes";
import { authRoleAtom, currentUserAtom } from "~/store/atoms";

function Layout() {
   const { pathname } = useLocation();
   return (
      <>
         <header className="bg-(--gray-2)">
            <nav className="containerX py-2 flex gap-4 items-center">
               <NavLink
                  className="shrink-0"
                  to={routes.home}
                  viewTransition={pathname !== routes.home}
               >
                  Cars Lab
               </NavLink>
               <AccountSection />
            </nav>
         </header>
         <main className="containerX">
            <Outlet />
         </main>
      </>
   );
}

function AccountSection() {
   const { pathname } = useLocation();

   const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

   const [authRole, setAuthRole] = useAtom(authRoleAtom);

   useEffect(() => {
      localStorage.setItem("authRole", authRole);
   }, [authRole]);

   const { data: currentUserFromApi, isPending } = useCurrentUser();

   const { data: _ } = useCurrentUserOrder();

  

   useEffect(() => {
      if (currentUserFromApi) {
         setCurrentUser(currentUserFromApi);
         setAuthRole(currentUserFromApi.role || "");
      } else setCurrentUser(null);
   }, [currentUserFromApi]);

   if (!authRole)
      return (
         <div className="flex gap-4 items-center ml-auto">
            <NavLink
               to={routes.login}
               viewTransition={pathname !== routes.login}
            >
               <Button variant="soft">Login / Signup</Button>
            </NavLink>
         </div>
      );
   if (isPending)
      return (
         <div className="flex items-center h-[32px] ml-auto">
            <Spinner />
         </div>
      );

   if (currentUser)
      return (
         <div className="flex gap-4 w-full">
            {currentUser.role === "ADMIN" && (
               <>
                  <NavLink
                     to={routes.orders}
                     viewTransition={pathname !== routes.orders}
                  >
                     <Button variant="soft" color="gray">
                        Orders
                     </Button>
                  </NavLink>
                  <AddCarNavLink />
               </>
            )}
            <NavLink
               className="ml-auto"
               to={routes.account}
               viewTransition={pathname !== routes.account}
            >
               <Button variant="ghost">
                  <span>{currentUser.username}</span>
                  <Avatar fallback={currentUser.username[0]} size="2" />
               </Button>
            </NavLink>
         </div>
      );
}

function AddCarNavLink() {
   const { pathname } = useLocation();

   if (pathname !== routes.createCar)
      return (
         <NavLink
            to={routes.createCar}
            style={{ viewTransitionName: "create-car" }}
            viewTransition
         >
            <Button variant="soft" color="gray">
               <span
                  className="!block"
                  style={{ viewTransitionName: "create-car-title" }}
               >
                  Create car <i className="pi pi-plus" />
               </span>
            </Button>
         </NavLink>
      );

   return (
      <Button variant="soft" color="gray">
         Create <i className="pi pi-plus" />
      </Button>
   );
}

export { Layout };
