import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/users/`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error al obtener usuarios" };
    }
};

// Registrar un nuevo usuario
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/register/`, userData, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error al registrar usuario" };
    }
};

// Actualizar un usuario existente (PUT)
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_URL}/api/users/${id}/`, userData, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error al actualizar usuario" };
    }
};

// Actualizar parcialmente un usuario (PATCH)
export const partiallyUpdateUser = async (id, userData) => {
    try {
        const response = await axios.patch(`${API_URL}/api/users/${id}/`, userData, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error al actualizar parcialmente usuario" };
    }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/users/${id}/`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
    } catch (error) {
        throw error.response?.data || { message: "Error al eliminar usuario" };
    }
};

// Resetear la contraseña de un usuario
export const resetPassword = async (id, newPassword) => {
    try {
        const response = await axios.patch(
            `${API_URL}/api/users/${id}/`,
            { password: newPassword },
            {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error al resetear contraseña" };
    }
};

// Obtener roles disponibles
export const getRoles = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/roles/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error al obtener roles" };
    }
};