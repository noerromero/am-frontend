import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
    const { user } = useAuth();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bienvenido</h1>
            <p>ID de Usuario: {user?.id}</p>
            <p>Rol: {user?.roleCode}</p>
            <LogoutButton />
        </div>
    );
};

export default Home;