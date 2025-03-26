// src/components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;