import { Avatar, Button, Card, Separator, Spinner } from "@radix-ui/themes";
import { useAtom, useSetAtom } from "jotai";
import { Link } from "react-router";
import { useLogoutMutation } from "~/api/mutations/mutations.hooks";
import { useCurrentUserOrder } from "~/api/queries/queries.hooks";
import { AccountOrderData } from "~/components/AccountOrderData";
import { PageTitleVT } from "~/components/PageTitleVT";
import { routes } from "~/global/config/routes";
import { authRoleAtom, currentUserAtom } from "~/store/atoms";

function Account() {
   const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
   const setAuthRole = useSetAtom(authRoleAtom);

   const { data: order, isPending: isPendingOrder } = useCurrentUserOrder();

   const { mutateAsync: logoutAsync, isPending: isLoggingOut } =
      useLogoutMutation();

   const logout = async () => {
      await logoutAsync(null);
      setAuthRole("");
      setCurrentUser(null);
   };

   if (!currentUser)
      return (
         <>
            <div className="flex justify-center p-2">
               <Spinner size="3" />
            </div>
         </>
      );

   return (
      <>
         <PageTitleVT>Account</PageTitleVT>
         <div className="md:p-8 grid gap-8 md:grid-cols-2">
            <div
               className="flex flex-col"
               style={{ viewTransitionName: "account-panel" }}
            >
               <div className="flex gap-2">
                  <Avatar fallback={currentUser.username[0]} size="5" />
                  <div>
                     <p>{currentUser.username}</p>
                     <p>{currentUser.email}</p>
                  </div>
               </div>
               <div className="flex mt-2">
                  <p className="bg-(--gray-3) py-1 px-4 rounded-full">
                     Role: {currentUser.role}
                  </p>
               </div>
               <div className="my-4">
                  <Separator className="!w-full" />
               </div>
               <div className="gap-4 flex justify-end">
                  <Button
                     variant="soft"
                     color="gray"
                     onClick={logout}
                     loading={isLoggingOut}
                  >
                     Log out <i className="pi pi-sign-out" />
                  </Button>
                  <Button variant="soft" color="red">
                     Delete account <i className="pi pi-trash" />
                  </Button>
               </div>
            </div>
            <div
               style={{ viewTransitionName: "account-order" }}
               className="h-full"
            >
               <Card
                  className="!h-full"
                  style={{ viewTransitionName: "user-order" }}
               >
                  {isPendingOrder && (
                     <div className="flex justify-center p-2">
                        <Spinner />
                     </div>
                  )}
                  {order && <AccountOrderData orderInfo={order} />}
                  {!isPendingOrder && !order && (
                     <p className="p-4 flex items-center flex-col gap-4">
                        <span>You are not renting any car</span>
                        <Link
                           to={routes.home}
                           viewTransition
                           className="flex items-center"
                        >
                           <Button variant="soft" color="gray">
                              Browse Cars
                           </Button>
                        </Link>
                     </p>
                  )}
               </Card>
            </div>
         </div>
      </>
   );
}

export { Account };
