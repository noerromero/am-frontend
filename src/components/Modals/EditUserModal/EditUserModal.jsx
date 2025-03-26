import React from "react";
import UserForm from "../../UserForm/UserForm";
import styles from "./EditUserModal.module.css";

const EditUserModal = ({ isOpen, user, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Encabezado */}
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Editar Usuario</h1>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Cuerpo */}
                <div className={styles.modalBody}>
                    <UserForm user={user} onSubmit={onSubmit} onCancel={onClose} />
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;