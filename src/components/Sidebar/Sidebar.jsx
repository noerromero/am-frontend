import React from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <img src="/logo.webp" alt="logo" width="40px" />
                <h1>Assets Management</h1>
            </div>
            <ul className={styles.sidebarLinks}>
                <h4>
                    <span>Menu Principal</span>
                    <div className={styles.menuSeparator}></div>
                </h4>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">home</span>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">overview</span>
                        <span>Revisar</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">monitoring</span>
                        <span>Estadísticas</span>
                    </a>
                </li>
                <h4>
                    <span>General</span>
                    <div className={styles.menuSeparator}></div>
                </h4>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">folder</span>
                        <span>Proyectos</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">group</span>
                        <span>Grupos</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">move_up</span>
                        <span>Transferencias</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">flag</span>
                        <span>Reportes</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">notifications_active</span>
                        <span>Notificaciones</span>
                    </a>
                </li>
                <h4>
                    <span>Usuario</span>
                    <div className={styles.menuSeparator}></div>
                </h4>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">account_circle</span>
                        <span>Perfil</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="material-symbols-outlined">settings</span>
                        <span>Configuración</span>
                    </a>
                </li>
                <li onClick={handleLogout}>
                    <a href="#">
                        <span className="material-symbols-outlined">logout</span>
                        <span>Cerrar Sesión</span>
                    </a>
                </li>
            </ul>
            <div className={styles.userAccount}>
                <div className={styles.userProfile}>
                    <img src="/business.jpg" alt="logo" width="40px" />
                </div>
                <div className={styles.userDetail}>
                    <h3>{user?.name}</h3>
                    <span>{user?.role.name}</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;