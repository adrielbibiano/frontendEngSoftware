import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// Importe o componente novo que criamos
import { GerenciarEscolas } from "./pages/GerenciarEscolas";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="p-4 border-b border-white/10 flex gap-4">
        <Link to="/" className="hover:underline text-blue-400">
          Home
        </Link>
        <Link to="/dashboard" className="hover:underline text-blue-400">
          Dashboard
        </Link>
        {/* Link novo para a gestão de escolas */}
        <Link to="/escolas" className="hover:underline text-blue-400">
          Escolas
        </Link>
        <Link to="/login" className="hover:underline text-blue-400">
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas Protegidas (Só acessa logado) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rota nova do CRUD de Escolas */}
        <Route
          path="/escolas"
          element={
            <PrivateRoute>
              <GerenciarEscolas />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
