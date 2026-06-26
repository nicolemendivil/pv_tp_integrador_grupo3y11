import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

import Header from "./components/layout/Header";

import { useAdmin } from "./context/AdminContext";

import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";

function App() {
  // Se obtiene el estado del administrador desde el contexto global
  const { admin } = useAdmin();
  // Verificar si hay un administrador logueado
  /*let pagina;
  if (admin) {
    pagina = <Dashboard />;
  } else {
    pagina = <Navigate to="/login" />;
  }*/
  return (
    <>
      <Header />

      <Routes>

        <Route
          path="/login"
          element={admin ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/"
          element={admin ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/clientes"
          element={admin ? <ListaClientes /> : <Navigate to="/login" />}
        />

        <Route
          path="/clientes/:id"
          element={admin ? <DetalleCliente /> : <Navigate to="/login" />}
        />

      </Routes>
    </>
  );
}

export default App;