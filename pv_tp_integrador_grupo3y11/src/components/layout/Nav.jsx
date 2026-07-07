import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import LogoutIcon from "@mui/icons-material/Logout";

import { useAdmin } from "../../context/AdminContext";

const Nav = () => {
  const navigate = useNavigate();
  const { logout } = useAdmin();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>


      <Button
        color="inherit"
        startIcon={<DashboardIcon />}
        onClick={() => navigate("/")}
      >
        Dashboard
      </Button>
       {/*
      <Button
       color="inherit"
       startIcon={<PersonAddIcon />}
       onClick={() => navigate("/alta")}
       > 
       Alta Cliente
      </Button>*/}

      <Button
        color="inherit"
        startIcon={<PeopleIcon />}
        onClick={() => navigate("/clientes")}
      >
        Clientes
      </Button>

      <Button
        color="inherit"
        startIcon={<LogoutIcon />}
        onClick={cerrarSesion}
      >
        Cerrar sesión
      </Button>

    </Box>
  );
};

export default Nav;