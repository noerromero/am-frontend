import React, { useState } from "react";
import InputBox from "../InputBox/InputBox";
import "./LoginForm.css";

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setEmailError("El email es obligatorio");
            return;
        } else {
            setEmailError("");
        }

        if (!password.trim()) {
            setPasswordError("La contraseña es obligatoria");
            return;
        } else {
            setPasswordError("");
        }

        onSubmit({ email, password });
    };

    return (
        <section className="container">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <InputBox
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email de usuario"
                        icon="bx bxs-user"
                        error={emailError}
                    />
                    <InputBox
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        icon="bx bxs-lock-alt"
                        error={passwordError}
                    />
                    <button type="submit" className="btn">
                        Iniciar sesión
                    </button>
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1 className="title_toggle">Hola, Bienvenido</h1>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;