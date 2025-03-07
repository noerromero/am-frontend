// src/App.jsx
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;