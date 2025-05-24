import type { User } from "~/api/types";
import { atom } from "jotai";

type CurrentUser = User;

const currentUserAtom = atom<CurrentUser | null>(null);

const getauthRoleFromStorage = () => {
   const authRole = localStorage.getItem("authRole") as
      | "USER"
      | "ADMIN";
   return authRole || "";
};

const authRoleAtom = atom<"USER" | "ADMIN" | "">(
   getauthRoleFromStorage()
);

export { currentUserAtom, authRoleAtom };
