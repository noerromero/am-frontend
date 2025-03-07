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
        <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "var(--primary-color)", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;