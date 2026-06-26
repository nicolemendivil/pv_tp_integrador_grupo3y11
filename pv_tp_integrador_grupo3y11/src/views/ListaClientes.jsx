import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    TextField,
    Box,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function ListaClientes() {

    // Estado donde se almacenan los clientes obtenidos desde la API
    const [clientes, setClientes] = useState([]);

    // Estado para controlar la carga de datos (loading)
    const [loading, setLoading] = useState(true);

    // Estado para manejar errores en la petición HTTP
    const [error, setError] = useState(null);

    // Estado para almacenar el texto de búsqueda del usuario
    const [busqueda, setBusqueda] = useState("");

    // useEffect se ejecuta una sola vez cuando el componente se monta
    useEffect(() => {

        const obtenerClientes = async () => {
            try {
                // Petición a la API externa para obtener usuarios
                const res = await fetch("https://fakestoreapi.com/users");

                // Conversión de la respuesta a JSON
                const data = await res.json();

                // Guardado de los clientes en el estado
                setClientes(data);

            } catch (err) {

                // Manejo de error en caso de falla de la API
                setError("Error al cargar los clientes");

            } finally {

                // Se desactiva el estado de carga sin importar el resultado
                setLoading(false);
            }
        };

        obtenerClientes();

    }, []);

    // Filtrado dinámico de clientes según búsqueda
    // Se filtra por apellido o por ciudad
    const filtrados = clientes.filter((c) => {
        return (
            c?.name?.lastname?.toLowerCase().includes(busqueda.toLowerCase()) ||
            c?.address?.city?.toLowerCase().includes(busqueda.toLowerCase())
        );
    });

    // Mientras se cargan los datos se muestra un spinner
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Si ocurre un error en la API se muestra un mensaje
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ p: 3 }}>

            {/* Título principal de la vista */}
            <Typography variant="h4" mb={2}>
                Lista de Clientes
            </Typography>

            {/* Input de búsqueda para filtrar clientes en tiempo real */}
            <TextField
                label="Buscar por apellido o ciudad"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            {/* Contenedor de la tabla con diseño de Material UI */}
            <TableContainer component={Paper}>

                <Table>

                    {/* Encabezado de la tabla */}
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Nombre Completo</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Teléfono</b></TableCell>
                            <TableCell><b>Ciudad</b></TableCell>
                            <TableCell><b>Acciones</b></TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Cuerpo de la tabla donde se renderizan los clientes */}
                    <TableBody>

                        {/* Se recorre el array filtrado para mostrar cada cliente */}
                        {filtrados.map((c) => (
                            <TableRow key={c.id}>

                                {/* ID del cliente */}
                                <TableCell>{c.id}</TableCell>

                                {/* Nombre completo del cliente */}
                                <TableCell>
                                    {c.name.firstname} {c.name.lastname}
                                </TableCell>

                                {/* Email del cliente */}
                                <TableCell>{c.email}</TableCell>

                                {/* Teléfono del cliente */}
                                <TableCell>{c.phone}</TableCell>

                                {/* Ciudad del cliente */}
                                <TableCell>{c.address.city}</TableCell>

                                {/* Enlace a la vista de detalle del cliente */}
                                <TableCell>
                                    <Link
                                        to={`/clientes/${c.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#1976d2",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Ver detalle
                                    </Link>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>

        </Box>
    );
}

export default ListaClientes;