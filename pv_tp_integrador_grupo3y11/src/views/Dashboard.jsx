import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button,Card } from "@mui/material";
import { useAdmin } from "../context/AdminContext";

import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import banner from "../assets/banner.jpg"

const Dashboard = () => {

  // Se obtiene el administrador logueado desde el contexto global
  // Esto permite mostrar datos del usuario autenticado en toda la app
  const { admin } = useAdmin();

  // Hook de React Router para navegar entre rutas sin recargar la página
  const navigate = useNavigate();

  return (
        <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#90caf9" }}>

      {/* iamgen de fondo*/}
      <Paper sx={{ overflow: "hidden", borderRadius: 3, mb: 4 }}>

        <Box
          component="img"
          src={banner}
          sx={{
            width: "100%",
            height: { xs: 160, sm: 220, md: 260 },
            objectFit: "cover",
          }}
        />

        {/* bienvenida */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#e3f2fd",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 22, sm: 30, md: 40 } }}
            color="primary"
            fontWeight="bold"
          >
            ¡Bienvenido, {admin.nombre}!
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Has iniciado sesión como <b>{admin.sector}</b>.
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Desde este panel podrás administrar clientes, consultar información y gestionar el sistema.
          </Typography>
        </Paper>

        {/* TITULO */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 22, sm: 30, md: 40 } }}
            color="primary"
            fontWeight="bold"
          >
            Panel Administrativo
          </Typography>

          <Typography color="text.secondary">
            Sistema de Gestión de Clientes con FakeStore API.
          </Typography>
        </Box>

      </Paper>

      {/* card*/}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          maxWidth: 1100,
          mx: "auto",
        }}
      >

        {/* clientes  */}
        <Card
          onClick={() => navigate("/clientes")}
          sx={{
            width: { xs: "100%", sm: "45%", md: "30%" },
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            borderRadius: 3,
            boxShadow: 3,
            transition: "0.25s",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: 8,
            },
          }}
        >
          <PeopleIcon sx={{ fontSize: 50, color: "#1976d2" }} />
          <Typography variant="h6">Clientes</Typography>
          <Typography>Administración completa</Typography>
        </Card>

        {/* admin */}
        <Card
          sx={{
            width: { xs: "100%", sm: "45%", md: "30%" },
            p: 3,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 50, color: "#1976d2" }} />
          <Typography variant="h6">Administrador</Typography>
          <Typography>{admin?.nombre}</Typography>
        </Card>

        {/* api */}
        <Card
          onClick={() => window.open("https://fakestoreapi.com/", "_blank")}
          sx={{
            width: { xs: "100%", sm: "45%", md: "30%" },
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            borderRadius: 3,
            boxShadow: 3,
            transition: "0.25s",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: 8,
            },
          }}
        >
          <CloudDoneIcon sx={{ fontSize: 50, color: "#1976d2" }} />
          <Typography variant="h6">API</Typography>
          <Typography>FakeStore Conectada</Typography>
        </Card>

      </Box>
    </Box>
  );
};
    
export default Dashboard;