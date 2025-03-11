import React from "react";
import styles from "./UserForm.module.css";

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState({
        name: user?.name || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        role: user?.role?.name || "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de contraseñas
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
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
                    required
                />
            </label>
            <label>
                Apellido:
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
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
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                    <option value="tecnic">Técnico</option>
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
                <button type="submit">{user ? "Actualizar" : "Guardar"}</button>
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default UserForm;