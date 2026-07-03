import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useAdmin } from "./context/AdminContext";

import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";
import FormularioAltaClientes from "./components/common/FormularioAltaCliente";

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
         <Route
          path="/alta"
          element={admin ? <FormularioAltaClientes /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;