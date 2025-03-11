import React from "react";
import UserForm from "../UserForm/UserForm";
import styles from "./Modals.module.css";

const EditUserModal = ({ isOpen, user, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Usuario</h2>
                <UserForm user={user} onSubmit={onSubmit} onCancel={onClose} />
            </div>
        </div>
    );
};

export default EditUserModal;