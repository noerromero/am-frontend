import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserList from "../../components/UserList/UserList";
import AddUserModal from "../../components/Modals/AddUserModal/AddUserModal";
import EditUserModal from "../../components/Modals/EditUserModal/EditUserModal";
import DeleteUserModal from "../../components/Modals/DeleteUserModal/DeleteUserModal";
import ResetPasswordModal from "../../components/Modals/ResetPasswordModal/ResetPasswordModal";
import { getAllUsers, registerUser, partiallyUpdateUser, deleteUser, resetPassword } from "../../services/UserService";
import { toast } from "react-toastify"; // Importa toast
import styles from "./Home.module.css";

const Home = () => {
    // Duración global para los toasts (en milisegundos)
    const TOAST_DURATION = 1500; // 1.5 segundos

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error(error.message);
            toast.error("Error al cargar los usuarios", { autoClose: TOAST_DURATION });
        }
    };

    const handleSearch = (query) => {
        const removeAccents = (text) => {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        const filtered = users.filter((user) => {
            const userText = `${user.name} ${user.lastName} ${user.email} ${user.role.name}`.toLowerCase();
            const normalizedUserText = removeAccents(userText);
            const normalizedQuery = removeAccents(query.toLowerCase());
            return normalizedUserText.includes(normalizedQuery);
        });

        setFilteredUsers(filtered);
    };

    const handleAddUser = async (userData) => {
        try {
            const userId = uuidv4(); // Genera un UUID único
            const userDataWithId = { ...userData, id: userId }; // Agrega el UUID al objeto

            await registerUser(userDataWithId);
            fetchUsers();
            setIsAddModalOpen(false);
            toast.success("Usuario agregado correctamente", { autoClose: TOAST_DURATION });
        } catch (error) {
            console.error(error.message);
            toast.error("Error al agregar el usuario", { autoClose: TOAST_DURATION });
        }
    };

    const handleEditUser = async (userData) => {
        try {
            await partiallyUpdateUser(selectedUser.id, userData);
            fetchUsers();
            setIsEditModalOpen(false);
            toast.success("Usuario editado correctamente", { autoClose: TOAST_DURATION });
        } catch (error) {
            console.error(error.message);
            toast.error("Error al editar el usuario", { autoClose: TOAST_DURATION });
        }
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(selectedUser.id);
            fetchUsers();
            setIsDeleteModalOpen(false);
            toast.success("Usuario eliminado correctamente", { autoClose: TOAST_DURATION });
        } catch (error) {
            console.error(error.message);
            toast.error("Error al eliminar el usuario", { autoClose: TOAST_DURATION });
        }
    };

    const handleResetPassword = async (newPassword) => {
        try {
            await resetPassword(selectedUser.id, newPassword);
            setIsResetPasswordModalOpen(false);
            toast.success("Contraseña restablecida correctamente", { autoClose: TOAST_DURATION });
        } catch (error) {
            console.error(error.message);
            toast.error("Error al restablecer la contraseña", { autoClose: TOAST_DURATION });
        }
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <section className={styles.content}>
                <div className={styles.headerBuscador}>
                    <h2>Gestión de Usuarios</h2>
                    <div className={styles.actions}>
                        <SearchBar onSearch={handleSearch} />
                        <button onClick={() => setIsAddModalOpen(true)}>
                            <span className="material-symbols-outlined"> add_circle </span>
                            Agregar Usuario
                        </button>
                    </div>
                </div>
                <UserList
                    users={filteredUsers}
                    onEdit={(user) => {
                        setSelectedUser(user);
                        setIsEditModalOpen(true);
                    }}
                    onDelete={(id) => {
                        setSelectedUser({ id });
                        setIsDeleteModalOpen(true);
                    }}
                    onResetPassword={(id) => {
                        setSelectedUser({ id });
                        setIsResetPasswordModalOpen(true);
                    }}
                />
            </section>

            {/* Modals */}
            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddUser}
            />
            <EditUserModal
                isOpen={isEditModalOpen}
                user={selectedUser}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditUser}
            />
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteUser}
            />
            <ResetPasswordModal
                isOpen={isResetPasswordModalOpen}
                onClose={() => setIsResetPasswordModalOpen(false)}
                onReset={handleResetPassword}
            />
        </div>
    );
};

export default Home;