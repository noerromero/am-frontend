import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // Llama a la función de búsqueda del padre
    };

    return (
        <div className={styles.search}>
            <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={handleChange}
            />
            <span className="material-symbols-outlined">search</span>
        </div>
    );
};

export default SearchBar;