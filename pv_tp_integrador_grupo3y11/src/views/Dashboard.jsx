import { Paper,Typography,Box } from "@mui/material";
import {useAdmin} from "../context/AdminContext";
const Dashboard=()=>{
    // Se obtiene el administrador logueado desde el contexto global
    const{admin}=useAdmin();
    return(
        <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Dashboard
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Typography>Bienvenido: {admin?.nombre}</Typography>
        <Typography>Sector: {admin?.sector}</Typography>
      </Paper>
    </Box>
    );
};
export default Dashboard;