import React, { useState } from "react";
import styles from "./UserList.module.css";

const UserList = ({ users, onEdit, onDelete, onResetPassword }) => {
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const usersPerPage = 10; // Número de usuarios por página

    // Calcular el índice inicial y final de los usuarios a mostrar
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Tabla de Usuarios */}
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
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td data-label="Nombre">{user.name}</td>
                            <td data-label="Apellido">{user.lastName}</td>
                            <td data-label="Correo">{user.email}</td>
                            <td data-label="Rol">{user.role.name}</td>
                            <td data-label="Acciones">
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

            {/* Pie de Página (Paginación) */}
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? styles.active : ""}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserList;