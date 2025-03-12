import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Importa toast
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de toast
import { getRoles } from "../../services/UserService";
import styles from "./UserForm.module.css";

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        role: user?.role?.name || "",
        password: "",
        confirmPassword: "",
    });

    const [roles, setRoles] = useState([]); // Estado para almacenar los roles obtenidos de la API

    // Cargar los roles al montar el componente
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (error) {
                console.error("Error al cargar roles:", error.message);
                toast.error("Error al cargar los roles");
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de contraseñas
        if (formData.password !== formData.confirmPassword) {
            toast.error("Las contraseñas no coinciden", {
                position: "top-right",
                autoClose: 2000, // Duración del toast (2 segundos)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        // Filtrar los datos antes de enviarlos
        const filteredData = {};
        for (const key in formData) {
            // Incluir solo los campos con valores no vacíos
            if (formData[key] !== "" && formData[key] !== null) {
                filteredData[key] = formData[key];
            }
        }

        // Asegurarse de que `name` y `lastName` tengan un valor predeterminado si están vacíos
        filteredData.name = formData.name.trim() === "" ? "   " : formData.name.trim();
        filteredData.lastName = formData.lastName.trim() === "" ? "   " : formData.lastName.trim();

        // Eliminar campos innecesarios para PATCH
        if (!filteredData.password) {
            delete filteredData.password;
            delete filteredData.confirmPassword;
        }

        // Llamar a la función onSubmit con los datos filtrados
        onSubmit(filteredData);
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Apellido:
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Correo:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Rol:
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">[Seleccionar]</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                            {role.name || role.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Contraseña:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!user}
                />
            </label>
            <label>
                Confirmar Contraseña:
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!user}
                />
            </label>
            <div className={styles.actions}>
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit">{user ? "Actualizar" : "Guardar"}</button>
            </div>
        </form>
    );
};

export default UserForm;