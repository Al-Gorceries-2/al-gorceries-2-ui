import { createContext, useContext } from "react";
import type { User } from "../data/user";

export const UserContext = createContext<User | null>(null);

export const useUser = (): User => {
    const user = useContext(UserContext);
    if (!user) {
        throw new Error("useUser must be used within an AuthenticatedRoute");
    }
    return user;
};
