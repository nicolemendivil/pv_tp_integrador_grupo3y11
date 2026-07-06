import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import {
    Container,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Snackbar,
    Box,
    Button,
    Divider,
    Chip,
    Stack,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

function DetalleCliente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { admin } = useAdmin();

    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para el Snackbar
    const [mostrarCartel, setMostrarCartel] = useState(false);
    const [mensajeCartel, setMensajeCartel] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("success");

    useEffect(() => {

        const obtenerCliente = async () => {
            try {
                //Primero revisa si el cliente está en nuestra copia local del localStorage
                const clientesLocales = JSON.parse(localStorage.getItem("clientes")) || [];
                const clienteEncontradoLocal = clientesLocales.find(
                    (c) => c.id === Number(id)
                );

                if (clienteEncontradoLocal) {
                    //Si lo encuentra acá (como tu nuevo cliente ID 11), usa estos datos y no llama a internet
                    setCliente(clienteEncontradoLocal);
                } else {
                    //Si no está localmente, va a buscarlo a la API original de internet
                    const respuesta = await fetch(
                        `https://fakestoreapi.com/users/${id}`
                     );
                    const datos = await respuesta.json();
                    setCliente(datos);
                }
            }catch (err) {
                setError("Error al cargar el cliente");
            } finally {
                setLoading(false);
            }
        };
        obtenerCliente();
    }, [id]);

    // Simulación de eliminación del cliente
    const eliminarCliente = async () => {

        const confirmar = window.confirm(
            "¿Está seguro de que desea eliminar este cliente?"
        );

        if (!confirmar) {
            return;
        }

        try {

            const respuesta = await fetch(
                `https://fakestoreapi.com/users/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (respuesta.ok) {

                // Elimina el cliente de la copia local
                const clientesLocales =
                    JSON.parse(localStorage.getItem("clientes")) || [];

                const nuevaLista = clientesLocales.filter(
                    (c) => c.id !== Number(id)
                );

                localStorage.setItem(
                    "clientes",
                    JSON.stringify(nuevaLista)
                );

                setTipoMensaje("success");
                setMensajeCartel("Cliente eliminado correctamente.");
                setMostrarCartel(true);

                setTimeout(() => {
                    navigate("/clientes");
                }, 1500);

            } else {

                setTipoMensaje("error");
                setMensajeCartel("No fue posible eliminar el cliente.");
                setMostrarCartel(true);

            }

        } catch (error) {

            setTipoMensaje("error");
            setMensajeCartel("Error al eliminar el cliente.");
            setMostrarCartel(true);

        }

    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!cliente) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="warning">
                    No se encontró el cliente.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>

            <Button
                variant="outlined"
                onClick={() => navigate("/clientes")}
                sx={{ mb: 3 }}
            >
                ← Volver
            </Button>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                Detalle del Cliente
            </Typography>

            <Card
                elevation={6}
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >

                <Box
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        p: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        {cliente.name.firstname} {cliente.name.lastname}
                    </Typography>

                    <Chip
                        label="Cliente activo"
                        color="success"
                        sx={{ mt: 2 }}
                    />
                </Box>

                <CardContent>

                    <Stack spacing={2}>

                        <Typography>
                            <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Email:</strong> {cliente.email}
                        </Typography>

                        <Typography>
                            <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Teléfono:</strong> {cliente.phone}
                        </Typography>

                        <Divider />

                        <Typography variant="h6" fontWeight="bold">
                            Dirección
                        </Typography>

                        <Typography>
                            <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Calle:</strong> {cliente.address.street}
                        </Typography>

                        <Typography>
                            <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Número:</strong> {cliente.address.number}
                        </Typography>

                        <Typography>
                            <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Ciudad:</strong> {cliente.address.city}
                        </Typography>

                        <Typography>
                            <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Código Postal:</strong> {cliente.address.zipcode}
                        </Typography>

                        <Divider />

                        <Typography variant="h6" fontWeight="bold">
                            Credenciales
                        </Typography>

                        <Typography>
                            <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Usuario:</strong> {cliente.username}
                        </Typography>

                        <Typography>
                            <KeyIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            <strong>Password:</strong> {cliente.password}
                        </Typography>

                        <Divider sx={{ my: 1 }} />

                        {admin?.sector === "Gerencia" && (
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                fullWidth
                                onClick={eliminarCliente}
                            >
                                Eliminar Cliente
                            </Button>
                        )}

                        {admin?.sector === "Soporte" && (
                            <Alert severity="info">
                                Modo solo lectura. El personal de Soporte no puede eliminar clientes.
                            </Alert>
                        )}

                    </Stack>

                </CardContent>

            </Card>

            <Snackbar
                open={mostrarCartel}
                autoHideDuration={3000}
                onClose={() => setMostrarCartel(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={tipoMensaje}
                    variant="filled"
                    onClose={() => setMostrarCartel(false)}
                >
                    {mensajeCartel}
                </Alert>
            </Snackbar>

        </Container>
    );
}

export default DetalleCliente;