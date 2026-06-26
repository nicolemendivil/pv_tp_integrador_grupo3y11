import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { CircularProgress, Alert } from "@mui/material";

function DetalleCliente() {

    // Obtiene el ID desde la URL (/clientes/:id)
    // Esto permite identificar qué cliente se debe mostrar
    const { id } = useParams();

    // Obtiene el administrador logueado desde el contexto global
    // Se usa para aplicar permisos según el sector (Soporte / Gerencia)
    const { admin } = useAdmin();

    // Estado donde se guarda la información del cliente
    const [cliente, setCliente] = useState(null);

    // Estado para manejar carga de datos (loading)
    const [loading, setLoading] = useState(true);

    // Estado para manejar posibles errores de la API
    const [error, setError] = useState(null);

    // useEffect se ejecuta cuando el componente se monta
    // o cuando cambia el ID del cliente
    useEffect(() => {

        const obtenerCliente = async () => {
            try {
                // Petición a la API para obtener un cliente específico por ID
                const respuesta = await fetch(
                    `https://fakestoreapi.com/users/${id}`
                );

                // Conversión de la respuesta a JSON
                const datos = await respuesta.json();

                // Guardado del cliente en el estado
                setCliente(datos);

            } catch (err) {

                // Si ocurre un error en la petición, se guarda el mensaje
                setError("Error al cargar el cliente");

            } finally {

                // Finaliza el estado de carga sin importar si hubo error o éxito
                setLoading(false);
            }
        };

        obtenerCliente();

    }, [id]);

    // Mientras se carga la información, se muestra un spinner
    if (loading) return <CircularProgress />;

    // Si ocurre un error en la API, se muestra un mensaje de error
    if (error) return <Alert severity="error">{error}</Alert>;

    // Si no se encontró el cliente, se informa al usuario
    if (!cliente) return <p>No se encontró el cliente</p>;

    return (
        <div>

            {/* Título principal del detalle */}
            <h1>Detalle del Cliente</h1>

            {/* Nombre completo del cliente */}
            <h2>
                {cliente.name.firstname} {cliente.name.lastname}
            </h2>

            {/* Información básica de contacto */}
            <p><b>Email:</b> {cliente.email}</p>
            <p><b>Teléfono:</b> {cliente.phone}</p>

            {/* Dirección del cliente (datos anidados del objeto) */}
            <h3>Dirección</h3>
            <p><b>Calle:</b> {cliente.address.street}</p>
            <p><b>Número:</b> {cliente.address.number}</p>
            <p><b>Ciudad:</b> {cliente.address.city}</p>
            <p><b>Código Postal:</b> {cliente.address.zipcode}</p>

            {/* Datos de acceso del cliente en el sistema */}
            <h3>Usuario del sistema</h3>
            <p><b>Username:</b> {cliente.username}</p>
            <p><b>Password:</b> {cliente.password}</p>

            {/* Lógica de permisos según el sector del administrador */}
            {/* Solo GERENCIA puede ver el botón de eliminar */}
            {admin?.sector === "Gerencia" && (
                <button
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        marginTop: "10px",
                        cursor: "pointer",
                    }}
                >
                    Eliminar Cliente (simulado)
                </button>
            )}

            {/* Si es SOPORTE, solo puede visualizar información */}
            {admin?.sector === "Soporte" && (
                <p style={{ marginTop: "10px", color: "gray" }}>
                    Solo lectura (Soporte)
                </p>
            )}
        </div>
    );
}

export default DetalleCliente;