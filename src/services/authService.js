import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login/`, { email, password });
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

        return { user, token, refreshToken };
    } catch (error) {


        throw error.response?.data || { message: "Error al iniciar sesión" };
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/api/user/logout/`, {}, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });

        Cookies.remove("token", { domain: import.meta.env.VITE_COOKIE_DOMAIN });
        Cookies.remove("refreshToken", { domain: import.meta.env.VITE_COOKIE_DOMAIN });
    } catch (error) {
        throw error.response?.data || { message: "Error al cerrar sesión" };
    }
};