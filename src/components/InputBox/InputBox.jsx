import { useState } from "react";
import styles from "./InputBox.module.css";

const InputBox = ({ type, value, onChange, placeholder, icon, error }) => {

    const [iconPassword, setIconPassword] = useState(true)
    const [hidePassword, setHidePassword] = useState("password")
    const [nameIcon, setNameIcon] = useState("bx bx-show");

    const changeNameIcon = () => {
        if (!iconPassword) {
            setNameIcon("bx bxs-lock-alt")
            setHidePassword("text")
        } else {
            setNameIcon("bx bx-show")
            setHidePassword("password")
        }
    }

    return (
        <div className={`${styles.inputBox} ${error ? styles.inputWarning : ""}`}>
            <input
                type={type === "password" ? hidePassword : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? styles.warning : ""}
                autoComplete={type === "password" ? "current-password" : "off"}
            />
            <i className={`${icon === "bx bx-show" ? nameIcon : icon} ${styles.icon}`} onClick={() => {
                setIconPassword(!iconPassword),
                    changeNameIcon()
            }}></i>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default InputBox;