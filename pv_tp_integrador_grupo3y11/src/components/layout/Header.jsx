import { Box,Button,Typography,AppBar,Toolbar } from "@mui/material";
import { useAdmin }from "../../context/AdminContext";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Nav from "./Nav";
const Header = () => {
// Se obtiene el administrador logueado desde el contexto global
const { admin, logout } =useAdmin();
// Si no hay administrador logueado, no se muestra el header
  if(!admin){
    return null;
  }
  return (
    <AppBar position="static">

      <Toolbar>

        {/* Logo */}

        <BusinessCenterIcon sx={{ mr: 1 }} />

        <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold"
          }}
        >
          Panel de Control
        </Typography>
        <Typography variant="body2">
           Administrador: <b>{admin.nombre}</b>
        </Typography>

        <Typography variant="body2">
          Sector: <b>{admin.sector}</b>
        </Typography>
        </Box>
        {/*Barra de navegacion*/}
        <Nav/>
      </Toolbar>

    </AppBar>
  );
};
export default Header;