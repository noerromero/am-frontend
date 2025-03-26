import React from "react";
import styles from "./DeleteUserModal.module.css";

const DeleteUserModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Encabezado */}
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Eliminar Usuario</h1>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Cuerpo */}
                <div className={styles.modalBody}>
                    <p>¿Está seguro que desea eliminar el usuario?</p>
                </div>

                {/* Pie de Página */}
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.deleteButton} onClick={onDelete}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;