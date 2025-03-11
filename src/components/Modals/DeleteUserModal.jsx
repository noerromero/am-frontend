import React from "react";
import styles from "./Modals.module.css";

const DeleteUserModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Eliminar Usuario</h2>
                <p>¿Está seguro que desea eliminar este usuario?</p>
                <div className={styles.actions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={onDelete}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;