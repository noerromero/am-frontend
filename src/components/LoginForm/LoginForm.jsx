import React, { useState } from "react";
import InputBox from "../InputBox/InputBox";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de email
        if (!email.trim()) {
            setEmailError("El email es obligatorio");
            return;
        } else {
            setEmailError("");
        }

        // Validación de contraseña
        if (!password.trim()) {
            setPasswordError("La contraseña es obligatoria");
            return;
        } else {
            setPasswordError("");
        }

        // Llamar a la función onSubmit pasada como prop
        onSubmit({ email, password });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.btn}>
                Iniciar sesión
            </button>
        </form>
    );
};

export default LoginForm;