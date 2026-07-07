import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Button,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InputAdornment from "@mui/material/InputAdornment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function ListaClientes() {

  // Estado donde se almacenan los clientes obtenidos desde la API
  const [clientes, setClientes] = useState([]);

  // Estado que indica si la información se está cargando
  const [loading, setLoading] = useState(true);

  // Estado para almacenar posibles errores
  const [error, setError] = useState(null);

  // Estado del buscador
  const [busqueda, setBusqueda] = useState("");

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  useEffect(() => {

    const clientesGuardados = localStorage.getItem("clientes");

    if (clientesGuardados) {

      setClientes(JSON.parse(clientesGuardados));
      setLoading(false);

    } else {

      const obtenerClientes = async () => {

        try {

          const res = await fetch("https://fakestoreapi.com/users");
          const data = await res.json();

          setClientes(data);

          // Guarda una copia local
          localStorage.setItem(
            "clientes",
            JSON.stringify(data)
          );

        } catch (err) {

          setError("Error al cargar los clientes");

        } finally {

          setLoading(false);

        }
      };

      obtenerClientes();
    }

  }, []);

  // Filtrado por apellido o ciudad
  const filtrados = clientes.filter((cliente) =>

    cliente.name.lastname
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    ||

    cliente.address.city
      .toLowerCase()
      .includes(busqueda.toLowerCase())

  );

  // Mientras se cargan los datos
  if (loading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>

    );

  }

  // Si ocurre un error
  if (error) {

    return (

      <Alert severity="error">

        {error}

      </Alert>

    );

  }

  return (

    <Box
      sx={{
        maxWidth: 1400,
        margin: "auto",
        p: 4,
      }}
    >

      {/* Botón para volver al Dashboard */}

      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        ← Volver
      </Button>
      {/*alta del cliente*/}
       <Button
         variant="contained"
         startIcon={<PersonAddIcon />}
         onClick={() => navigate("/alta")}
          sx={{
          display: "flex",
          ml: "auto",
          mb: 2,
          }}
        >
         Alta Cliente
       </Button>
      {/* Título */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Lista de Clientes
      </Typography>
      
      {/* Buscador */}

      <TextField
        fullWidth
        label="Buscar por apellido o ciudad"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ mb: 4 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Contenedor de las tarjetas */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          },

          gap: 3,
        }}
      >
        {filtrados.map((cliente) => (

          <Card
            key={cliente.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 270,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              transition: "0.25s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 8,
              },
            }}
          >

            {/* Encabezado */}

            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                px: 2,
                py: 1.5,
              }}
            >

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {cliente.name.firstname} {cliente.name.lastname}
              </Typography>

            </Box>

            {/* Información */}

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >

              <Chip
                label="Cliente activo"
                color="primary"
                size="small"
                sx={{
                  width: "fit-content",
                  mb: 2,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <EmailIcon fontSize="small" color="primary" />

                <Typography variant="body2">
                  <strong>Email:</strong> {cliente.email}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <PhoneIcon fontSize="small" color="primary" />

                <Typography variant="body2">
                  <strong>Teléfono:</strong> {cliente.phone}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocationOnIcon fontSize="small" color="primary" />

                <Typography variant="body2">
                  <strong>Ciudad:</strong> {cliente.address.city}
                </Typography>
              </Box>

              {/* Empuja el botón hacia abajo */}

              <Box sx={{ flexGrow: 1 }} />

              <Button
                component={Link}
                to={`/clientes/${cliente.id}`}
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Ver detalle
              </Button>

            </CardContent>

          </Card>

        ))}

      </Box>

    </Box>

  );

}

export default ListaClientes;