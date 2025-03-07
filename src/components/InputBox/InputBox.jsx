
import { useState } from "react";
import styles from "./InputBox.module.css";

const InputBox = ({ type, value, onChange, placeholder, icon, error }) => {
    const [inputType, setInputType] = useState(type);

    return (
        <div className={`${styles["input-box"]} ${error ? styles["input-warning"] : ""}`}>
            <input
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
            <i className={`${icon} ${styles.icon}`}></i>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default InputBox;