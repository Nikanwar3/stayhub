import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data } = await api.getMe();
            if (data.success) {
                setUser(data.user);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (credentials) => {
        const { data } = await api.login(credentials);
        if (data.success) {
            setUser(data.user);
        }
        return data;
    };

    const signupUser = async (userData) => {
        const { data } = await api.signup(userData);
        if (data.success) {
            setUser(data.user);
        }
        return data;
    };

    const logoutUser = async () => {
        await api.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, loginUser, signupUser, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
