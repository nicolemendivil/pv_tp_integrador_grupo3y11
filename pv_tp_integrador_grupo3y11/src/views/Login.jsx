import{Box,TextField,Button,MenuItem, Paper, Typography} from "@mui/material";
import { useState} from "react";
import { useAdmin} from "../context/AdminContext";
import { useNavigate} from "react-router-dom";
const Login=()=>{
    const[nombre,setNombre]=useState("");
    const [sector, setSector] =useState("");

    const { login } = useAdmin();
    const navigate = useNavigate();

    const ingresar = () => {
    if (!nombre || !sector) {
      alert("Completa todos los campos");
      return;
    }

    login({
      nombre,
      sector
    });
    navigate("/");
  };
  return (
     <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
     <Paper sx={{ padding: 4, width: 350 }}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>
      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        value={nombre}
        onChange={(e)=>
          setNombre(e.target.value)
        }
      />

      <TextField
        select
        label="Sector"
        fullWidth
        margin="normal"
        value={sector}
        onChange={(e)=>
          setSector(e.target.value)
        }
      >
        <MenuItem value="Soporte">
          Soporte
        </MenuItem>

        <MenuItem value="Gerencia">
          Gerencia
        </MenuItem>

      </TextField>

      <Button
        fullWidth
        variant="contained"
        sx={{mt: 2}}
        disabled={!nombre || !sector}
        onClick={ingresar}
      >
        Ingresar
      </Button>
      </Paper>
   </Box>
  );
};
export default Login;
