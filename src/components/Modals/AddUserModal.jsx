import React from "react";
import UserForm from "../UserForm/UserForm";
import styles from "./Modals.module.css";

const AddUserModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Agregar Usuario</h2>
                <UserForm onSubmit={onSubmit} onCancel={onClose} />
            </div>
        </div>
    );
};

export default AddUserModal;