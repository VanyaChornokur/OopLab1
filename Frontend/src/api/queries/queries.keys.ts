const queriesKeys = {
   cars: ["cars"],
   car: (id: string) => ["cars", id],
   currentUser: ["current-user"],
   orders: ["orders"],
   order: (id: string) => ["orders", id],
   currentUserOrder: ["orders", "current-user-order"]
};

export type QueriesKeysType = string[];

export { queriesKeys };
