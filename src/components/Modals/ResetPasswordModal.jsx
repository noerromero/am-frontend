import React, { useState } from "react";
import styles from "./Modals.module.css";

// Función para generar una contraseña segura
const generateSecurePassword = () => {
    const length = 8; // Longitud de la contraseña
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
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

    if (!isOpen) return null;

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

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Resetear Contraseña</h2>
                <p>Contraseña generada automáticamente:</p>

                {/* Campo de Contraseña */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        value={newPassword}
                        readOnly
                        style={{
                            flex: 1,
                            padding: "8px",
                            marginRight: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                    {/* Botón para Generar Contraseña */}
                    <button
                        onClick={() => setNewPassword(generateSecurePassword())}
                        style={{
                            padding: "8px 12px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Generar Contraseña
                    </button>
                </div>

                {/* Botón para Copiar Contraseña */}
                <button
                    onClick={copyToClipboard}
                    disabled={!newPassword}
                    style={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        backgroundColor: copied ? "#28a745" : "#ffc107",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: newPassword ? "pointer" : "not-allowed",
                    }}
                >
                    {copied ? "¡Copiado!" : "Copiar Contraseña"}
                </button>

                {/* Acciones del Modal */}
                <div className={styles.actions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={() => onReset(newPassword)} disabled={!newPassword}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;