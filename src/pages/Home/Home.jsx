import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserList from "../../components/UserList/UserList";
import AddUserModal from "../../components/Modals/AddUserModal";
import EditUserModal from "../../components/Modals/EditUserModal";
import DeleteUserModal from "../../components/Modals/DeleteUserModal";
import ResetPasswordModal from "../../components/Modals/ResetPasswordModal";
import { getAllUsers, registerUser, updateUser, deleteUser, resetPassword } from "../../services/UserService";
import styles from "./Home.module.css";


const Home = () => {
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
        }
    };

    const handleSearch = (query) => {
        const filtered = users.filter((user) =>
            `${user.name} ${user.lastName} ${user.email}`.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleAddUser = async (userData) => {
        try {
            await registerUser(userData);
            fetchUsers();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEditUser = async (userData) => {
        try {
            await updateUser(selectedUser.id, userData);
            fetchUsers();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(selectedUser.id);
            fetchUsers();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleResetPassword = async (newPassword) => {
        try {
            await resetPassword(selectedUser.id, newPassword);
            setIsResetPasswordModalOpen(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <section className={styles.content}>
                <h2>Gestión de Usuarios</h2>
                <div className={styles.actions}>
                    <SearchBar onSearch={handleSearch} />
                    <button onClick={() => setIsAddModalOpen(true)}>
                        <span className="material-symbols-outlined"> add_circle </span>
                        Agregar Usuario
                    </button>
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
                {/* Pagination */}
                <nav>
                    <ul className="pagination">
                        <li><a href=""></a></li>
                        <li><a href="" id="nav-id">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href=""></a></li>
                    </ul>
                </nav>
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