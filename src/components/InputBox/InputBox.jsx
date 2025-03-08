import { useState } from "react";
import styles from "./InputBox.module.css";

const InputBox = ({ type, value, onChange, placeholder, icon, error }) => {
    const [inputType] = useState(type);

    return (
        <div className={`${styles.inputBox} ${error ? styles.inputWarning : ""}`}>
            <input
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? styles.warning : ""}
            />
            <i className={`${icon} ${styles.icon}`}></i>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default InputBox;