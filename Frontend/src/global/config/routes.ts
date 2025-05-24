const routes = {
   home: "/",

   // auth
   login: "/login",
   signup: "/signup",
   account: "/account",

   // Admin
   orders: "/orders",
   createCar: "/create-car",

   // Errors
   notFound: "/not-found",
   notAllowed: "/not-allowed"
} as const;

type RoutesType = keyof typeof routes;

export { routes };

export type { RoutesType };
