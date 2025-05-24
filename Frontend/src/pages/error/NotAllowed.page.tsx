import { Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router";
import { routes } from "~/global/config/routes";

function NotAllowed() {
   const navigate = useNavigate();

   return (
      <div className="mt-4">
         <h2 className="text-center">401</h2>
         <p className="text-center">
            You don't have permission to access this page
         </p>
         <div className="mt-4 flex justify-center gap-4">
            <Link to={routes.home}>
               <Button variant="soft" color="gray">
                  Home
               </Button>
            </Link>
            <Button variant="soft" onClick={() => navigate(-1)}>
               Back
            </Button>
         </div>
      </div>
   );
}

export { NotAllowed };
