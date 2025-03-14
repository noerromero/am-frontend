import React from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

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
                <img src="/Sidebar/logo.webp" alt="logo" width="40px" />
                <h1>Assets Management</h1>
            </div>
            {/* ****Menu */}

            <ul className={styles.sidebarLinks}>
                {
                    user?.role.permissions.map((menuTitle, indexMenuTitle) => (
                        <React.Fragment key={indexMenuTitle}>
                            <h4 key={indexMenuTitle}>
                                <span>{`${menuTitle.title}`}</span>
                                <div className={styles.menuSeparator}></div>
                            </h4>
                            {
                                menuTitle.functions.map((menuOption, indexMenuOption) => (
                                    <React.Fragment key={indexMenuOption}>
                                        <li>
                                            <Link to="/"> {/* Usamos Link en lugar de <a> */}
                                                <img src={`./Sidebar/${menuOption}.png`} alt="logo" width="40px" />
                                                <span>{menuOption}</span>
                                            </Link>
                                        </li>
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
                <li onClick={handleLogout}>
                    <a href="#">
                        <img src="/Sidebar/cerrarSession.png" alt="logo" width="40px" />
                        <span>Cerrar Sesión</span>
                    </a>
                </li>
            </ul>


            <div className={styles.userAccount}>
                <div className={styles.userProfile}>
                    {/* Ícono generado dinámicamente */}
                    <div className={styles.userIcon}>
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                </div>
                <div className={styles.userDetail}>
                    <h3>{user?.name || "Usuario"}</h3>
                    <span>{user?.role?.name || "Sin rol"}</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;