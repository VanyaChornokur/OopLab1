import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router";
import { routes } from "~/global/config/routes";
import { authRoleAtom } from "~/store/atoms";

function AuthRoutes() {
   const authRole = useAtomValue(authRoleAtom);

   return (
      <>
         {!authRole && <Navigate to={routes.login} replace />}
         {authRole && <Outlet />}
      </>
   );
}

function AdminRoutes() {
   const authRole = useAtomValue(authRoleAtom);

   return (
      <>
         {authRole !== "ADMIN" && <Navigate to={routes.notAllowed} replace />}
         {authRole === "ADMIN" && <Outlet />}
      </>
   );
}

export { AuthRoutes, AdminRoutes };
