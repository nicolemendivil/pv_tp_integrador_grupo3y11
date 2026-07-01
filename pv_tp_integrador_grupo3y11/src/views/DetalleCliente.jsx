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

    useEffect(() => {

        const obtenerCliente = async () => {

            try {

                const respuesta = await fetch(
                    `https://fakestoreapi.com/users/${id}`
                );

                const datos = await respuesta.json();

                setCliente(datos);

            } catch (err) {

                setError("Error al cargar el cliente");

            } finally {

                setLoading(false);

            }
        };

        obtenerCliente();

    }, [id]);

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
                            <EmailIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Email:</strong> {cliente.email}
                        </Typography>

                        <Typography>
                            <PhoneIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Teléfono:</strong> {cliente.phone}
                        </Typography>

                        <Divider />

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            Dirección
                        </Typography>

                        <Typography>
                            <LocationOnIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Calle:</strong> {cliente.address.street}
                        </Typography>

                        <Typography>
                            <LocationOnIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Número:</strong> {cliente.address.number}
                        </Typography>

                        <Typography>
                            <LocationOnIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Ciudad:</strong> {cliente.address.city}
                        </Typography>

                        <Typography>
                            <LocationOnIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Código Postal:</strong> {cliente.address.zipcode}
                        </Typography>

                        <Divider />

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            Credenciales
                        </Typography>

                        <Typography>
                            <PersonIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Usuario:</strong> {cliente.username}
                        </Typography>

                        <Typography>
                            <KeyIcon
                                sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                }}
                            />
                            <strong>Password:</strong> {cliente.password}
                        </Typography>

                        <Divider sx={{ my: 1 }} />

                        {admin?.sector === "Gerencia" && (
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                fullWidth
                            >
                                Eliminar Cliente (simulado)
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

        </Container>
    );
}

export default DetalleCliente;