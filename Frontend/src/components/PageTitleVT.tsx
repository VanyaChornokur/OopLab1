import type { PropsWithChildren } from "react";

function PageTitleVT({ children }: PropsWithChildren) {
   return (
      <h1 className="text-center mt-4" style={{ viewTransitionName: "title" }}>
         {children}
      </h1>
   );
}

export { PageTitleVT };
