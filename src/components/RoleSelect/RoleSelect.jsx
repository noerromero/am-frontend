import React from "react";
import styles from "./RoleSelect.module.css";

const RoleSelect = ({ roles, value, onChange }) => {
    return (
        <select
            className={styles.roleSelect}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">[Seleccionar]</option>
            {roles.map((role) => (
                <option key={role.id} value={role.id}>
                    {role.name}
                </option>
            ))}
        </select>
    );
};

export default RoleSelect;