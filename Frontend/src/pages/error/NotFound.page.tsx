import { Button } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "~/global/config/routes";

function NotFound() {
   return (
      <div className="mt-8">
         <h2 className="text-center">404</h2>
         <p className="text-center">Page is not found</p>
         <div className="mt-4 flex justify-center">
            <Link to={routes.home}>
               <Button variant="soft" color="gray">
                  Home
               </Button>
            </Link>
         </div>
      </div>
   );
}

export { NotFound };
