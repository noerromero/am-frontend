import React, { useState, useEffect } from "react";
import styles from "./UserList.module.css";

const UserList = ({ users, onEdit, onDelete, onResetPassword }) => {
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const usersPerPage = 10; // Número de usuarios por página

    // Restablecer la página actual cuando cambia la lista de usuarios
    useEffect(() => {
        setCurrentPage(1); // Volver a la primera página al cambiar los usuarios filtrados
    }, [users]);

    // Calcular el índice inicial y final de los usuarios a mostrar
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Ir a la página anterior
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Ir a la página siguiente
    const goToNextPage = () => {
        if (currentPage < Math.ceil(users.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No se encontraron resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pie de Página (Paginación) */}
            <div className={styles.pagination}>
                {/* Botón para retroceder */}
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1} // Desactivar si estamos en la primera página
                    className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                >
                    {`<<`}
                </button>

                {/* Números de página */}
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`${styles.paginationButton} ${currentPage === i + 1 ? styles.active : ""
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                {/* Botón para avanzar */}
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === Math.ceil(users.length / usersPerPage)} // Desactivar si estamos en la última página
                    className={`${styles.paginationButton} ${currentPage === Math.ceil(users.length / usersPerPage) ? styles.disabled : ""
                        }`}
                >
                    {`>>`}
                </button>
            </div>
        </div>
    );
};

export default UserList;