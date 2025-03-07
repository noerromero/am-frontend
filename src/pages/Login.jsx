import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm/LoginForm";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async ({ email, password }) => {
        try {
            await login(email, password);
            toast.success("Contraseña correcta", {
                onClose: () => navigate("/"),
            });
        } catch (error) {
            // Mostrar el mensaje de error específico enviado por el servidor
            const errorMessage = error?.response?.data?.error || "Error al iniciar sesión";
            toast.error(errorMessage);
        }
    };

    return (
        <section className="container">
            <div className="form-box">
                <LoginForm onSubmit={handleLogin} />
            </div>
        </section>
    );
};

export default Login;