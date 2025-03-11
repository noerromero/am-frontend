import React, { useState } from "react";
import styles from "./Modals.module.css";

const ResetPasswordModal = ({ isOpen, onClose, onReset }) => {
    const [newPassword, setNewPassword] = useState("");

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Resetear Contraseña</h2>
                <p>Ingrese una nueva contraseña:</p>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva Contraseña"
                />
                <div className={styles.actions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={() => onReset(newPassword)}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;