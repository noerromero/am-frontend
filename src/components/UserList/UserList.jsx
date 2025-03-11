import React from "react";
import styles from "./UserList.module.css";

const UserList = ({ users, onEdit, onDelete, onResetPassword }) => {
    return (
        <table className={styles.tableUsers}>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role.name}</td>
                        <td>
                            <button onClick={() => onResetPassword(user.id)}>
                                <span className="material-symbols-outlined">password</span>
                            </button>
                            <button onClick={() => onEdit(user)}>
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button onClick={() => onDelete(user.id)}>
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;