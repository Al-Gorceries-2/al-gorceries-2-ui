import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "../data/user";
import { GET } from "../service/api";
import { UserContext } from "../contexts/userContext";

interface ProtectedRouteProps {
    children: JSX.Element;
    requireHousehold?: boolean;
}

export const AuthenticatedRoute = ({ children, requireHousehold }: ProtectedRouteProps) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                setUser(await GET<User>("/me"));
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    if (loading) {
        return <div className="w-screen h-screen bg-neutral-900" />;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (requireHousehold && !user.householdId) {
        return <Navigate to="/settings" replace />;
    }

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
