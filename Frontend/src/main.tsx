import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToasterProvider } from "./components/ToasterProvider";
import { AppRouter } from "./router/AppRouter";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Theme appearance="dark" accentColor="purple">
            <AppRouter />
            <ToasterProvider />
         </Theme>
      </QueryClientProvider>
   );
}

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <App />
   </StrictMode>
);
