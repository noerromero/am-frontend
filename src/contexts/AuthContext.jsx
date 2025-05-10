// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const decodeToken = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            return JSON.parse(window.atob(base64));
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };

    const verifyAuth = async () => {
        const token = Cookies.get("token");
        const refreshToken = Cookies.get("refreshToken");

        if (token) {
            try {
                const decodedToken = decodeToken(token);
                if (!decodedToken) throw new Error("Token inválido");

                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    await refreshAccessToken(refreshToken);
                } else {
                    const userData = await fetchUserData(decodedToken.id);
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error al verificar la autenticación:", error);
                logout();
            }
        } else {
            logout();
        }

        setLoading(false);
    };

    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await axios.post(`${API_URL}/api/user/login`, {}, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });

            const { token: newToken, refreshToken: newRefreshToken, user } = response.data;

            Cookies.set("token", newToken, {
                expires: 1,
                domain: import.meta.env.VITE_COOKIE_DOMAIN,
                secure: true,
                sameSite: "strict",
            });

            Cookies.set("refreshToken", newRefreshToken, {
                expires: 7,
                domain: import.meta.env.VITE_COOKIE_DOMAIN,
                secure: true,
                sameSite: "strict",
            });

            const userData = await fetchUserData(user.id);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error al renovar el token:", error);
            logout();
        }
    };

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/api/user/login`, { email, password });

            const { token, refreshToken, user } = response.data;

            Cookies.set("token", token, {
                expires: 1,
                domain: import.meta.env.VITE_COOKIE_DOMAIN,
                secure: true,
                sameSite: "strict",
            });

            Cookies.set("refreshToken", refreshToken, {
                expires: 7,
                domain: import.meta.env.VITE_COOKIE_DOMAIN,
                secure: true,
                sameSite: "strict",
            });

            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            throw error.response?.data || { message: "Error al iniciar sesión" };
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/api/user/logout`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            });

            Cookies.remove("token", { domain: import.meta.env.VITE_COOKIE_DOMAIN });
            Cookies.remove("refreshToken", { domain: import.meta.env.VITE_COOKIE_DOMAIN });

            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Ejecutar verifyAuth cada 2 segundos
    useEffect(() => {
        verifyAuth();
        const intervalId = setInterval(() => {
            verifyAuth();
        }, 2000);

        // Limpiar el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}>
                <ClipLoader color="#36d7b7" size={100} />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};