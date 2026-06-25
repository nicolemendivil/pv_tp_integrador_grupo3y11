import { Box,Button,Typography } from "@mui/material";
import { useAdmin }from "../../context/AdminContext";
import { useNavigate }from "react-router-dom";

const Header = () => {
// Se obtiene el administrador logueado desde el contexto global
const { admin, logout } =useAdmin();
const navigate =useNavigate();
// Función para cerrar sesión:
// elimina los datos del contexto y redirige al login
const cerrarSesion = () => {logout();
navigate("/login"); };
// Si no hay administrador logueado, no se muestra el header
  if(!admin){
    return null;
  }
  return (
    <Box
  component="header"
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#1976d2",
    color: "white",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
  }}
>
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Typography variant="subtitle2">
      Administrador: {admin.nombre}
    </Typography>

    <Typography variant="caption">
      Sector: {admin.sector}
    </Typography>
  </Box>

  <Button variant="contained" color="error" onClick={cerrarSesion}>
    Cerrar Sesión
  </Button>
</Box>
);
};
export default Header;