import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../../components/LoginForm/LoginForm";
import { toast } from "react-toastify";
import './Login.css'

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
            toast.error(error.error);
        }
    };

    return (
        <section className="container_login">
            <LoginForm onSubmit={handleLogin} />
        </section>
    );
};

export default Login;
