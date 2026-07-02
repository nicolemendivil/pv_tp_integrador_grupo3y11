import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button,Grid } from "@mui/material";
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
       <Box sx={{ p:4 ,
        backgroundColor:"#90caf9"
       }}>
      
      {/* Banner */}

      <Paper
        sx={{
          overflow:"hidden",
          borderRadius:3,
          mb:4
        }}
      >

        <Box
          component="img"
          src={banner}
          sx={{
            width:"100%",
            height:260,
            objectFit:"cover"
          }}
        />
        <Paper
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3,
    backgroundColor: "#e3f2fd",
  }}
>
  <Typography variant="h4" color="primary" fontWeight="bold">
    ¡Bienvenido, {admin.nombre}!
  </Typography>

  <Typography sx={{ mt: 1 }}>
    Has iniciado sesión como <b>{admin.sector}</b>.
  </Typography>

  <Typography color="text.secondary" sx={{ mt: 2 }}>
    Desde este panel podrás administrar los clientes registrados,
    consultar su información y acceder a las diferentes funciones del
    sistema.
  </Typography>
</Paper>

        <Box sx={{p:3}}>

          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
          >
            Panel Administrativo
          </Typography>

          <Typography color="text.secondary">
            Sistema de Gestión de Clientes utilizando FakeStore API.
          </Typography>

        </Box>

      </Paper>

      {/* Cards */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>

      <Grid container spacing={3}  sx={{ maxWidth: 1100 }}>
        
        <Grid item xs={12} md={4}>

          <Paper 
          onClick={() => navigate("/clientes")}
          sx={{p:3,textAlign:"center"}}>
             
            <PeopleIcon
              sx={{
                fontSize:50,
                color:"#1976d2"
              }}
            />

            <Typography variant="h6">
              Clientes
            </Typography>

            <Typography>
              Administración completa
            </Typography>

          </Paper>

        </Grid>

        <Grid item xs={12} md={4} >

          <Paper sx={{p:3,textAlign:"center"}}>

            <AdminPanelSettingsIcon
              sx={{
                fontSize:50,
                color:"#1976d2"
              }}
            />

            <Typography variant="h6">
              Administrador
            </Typography>

            <Typography>
              {admin?.nombre}
            </Typography>

          </Paper>

        </Grid>

        <Grid item xs={12} md={4}>

          <Paper onClick={() => window.open("https://fakestoreapi.com/", "_blank")} sx={{p:3,textAlign:"center"}}>
            
            <CloudDoneIcon
              sx={{
                fontSize:50,
                color:"#1976d2"
              }}
            />

            <Typography variant="h6">
              API
            </Typography>

            <Typography>
              FakeStore Conectada
            </Typography>

          </Paper>

        </Grid>

      </Grid>
      </Box>
    </Box>

  );

};
    
export default Dashboard;