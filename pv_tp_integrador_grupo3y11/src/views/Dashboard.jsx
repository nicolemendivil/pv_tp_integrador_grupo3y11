import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useAdmin } from "../context/AdminContext";

const Dashboard = () => {

  // Se obtiene el administrador logueado desde el contexto global
  // Esto permite mostrar datos del usuario autenticado en toda la app
  const { admin } = useAdmin();

  // Hook de React Router para navegar entre rutas sin recargar la página
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      {/*Título principal del dashboard */}
      <Typography variant="h4" mb={2}>
        Dashboard
      </Typography>

      {/*Tarjeta informativa con datos del administrador logueado */}
      <Paper sx={{ p: 2 }}>
        {/*Nombre del administrador (opcional chaining por seguridad) */}
        <Typography>Bienvenido: {admin?.nombre}</Typography>

        {/*Sector del administrador (Soporte / Gerencia) */}
        <Typography>Sector: {admin?.sector}</Typography>
      </Paper>

      {/*Botón de navegación hacia el módulo de clientes */}
      {/* Al hacer click se redirige a /clientes usando React Router */}
      <Button
        variant="contained"
        onClick={() => navigate("/clientes")}
      >
        Ver Clientes
      </Button>
    </Box>
  );
};

export default Dashboard;