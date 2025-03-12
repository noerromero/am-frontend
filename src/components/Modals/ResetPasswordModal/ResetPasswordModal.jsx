import React, { useState, useEffect } from "react";
import styles from "./ResetPasswordModal.module.css";

// Función para generar una contraseña segura
const generateSecurePassword = () => {
    const length = 8; // Longitud de la contraseña
    const charset =
        "ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()}{[]=";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

const ResetPasswordModal = ({ isOpen, onClose, onReset }) => {
    const [newPassword, setNewPassword] = useState("");
    const [copied, setCopied] = useState(false); // Estado para indicar si la contraseña fue copiada

    // Generar una contraseña automáticamente cuando el modal se abre
    useEffect(() => {
        if (isOpen) {
            setNewPassword(generateSecurePassword());
        }
    }, [isOpen]);

    // Función para generar una nueva contraseña al hacer clic en el botón
    const handleGeneratePassword = () => {
        setNewPassword(generateSecurePassword());
    };

    // Función para copiar la contraseña al portapapeles
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(newPassword);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Restablecer el estado después de 2 segundos
        } catch (error) {
            console.error("Error al copiar la contraseña:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Encabezado */}
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Resetear Contraseña</h1>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Cuerpo */}
                <div className={styles.modalBody}>
                    <p>¿Desea guardar esta contraseña?</p>
                    <div className={styles.password}>
                        <input
                            type="text"
                            value={newPassword}
                            readOnly
                            className={styles.passwordInput}
                        />
                        <button
                            className={styles.copyButton}
                            onClick={copyToClipboard}
                            disabled={!newPassword}
                        >
                            <span className="material-symbols-outlined">
                                content_copy
                            </span>
                        </button>
                    </div>
                    {/* Botón para generar una nueva contraseña */}
                    <button
                        className={styles.generateButton}
                        onClick={handleGeneratePassword}
                    >
                        Generar Contraseña
                    </button>
                </div>

                {/* Pie de Página */}
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        className={styles.saveButton}
                        onClick={() => onReset(newPassword)}
                        disabled={!newPassword}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;