import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Snackbar,
  Paper
} from "@mui/material";

const FormAltaCliente = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Estados para el cartel flotante
  const [mostrarCartel, setMostrarCartel] = useState(false);
  const [mensajeCartel, setMensajeCartel] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  //Función que se ejecuta al enviar el formulario
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    //Crea el objeto como figura en la API
    const nuevoCliente = {
      address: {
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
        city: ciudad,
        street: calle,
        number: Number(numero),
        zipcode: codigoPostal,
      },
      email: correo,
      username: usuario,
      password: clave,
      name: {
        firstname: nombre,
        lastname: apellido,
      },
      phone: telefono,
    };
    try {
      // 1. Envia el objeto por POST a la API de prueba
      const respuesta = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCliente),
      });

      //Agregar el cliente en la lista de clientes
    //2. Trae lo que ya está guardado en localStorage o creamos un array vacío si no hay nada
      const clientesLocales = JSON.parse(localStorage.getItem("clientes")) || [];

      //3. CÁLCULO SEGURO DEL ID DINÁMICO:
      // Si la lista tiene clientes, busca el ID más alto existente y le suma 1.
      // Si por alguna razón la lista estuviera vacía, arranca en 11 por defecto.
      const proximoId = clientesLocales.length > 0 
        ? Math.max(...clientesLocales.map(c => c.id)) + 1 
        : 11;

      //4. Arma el cliente completo incluyendo nuestro ID único calculado
      const clienteCreadoCompleto = {
        ...nuevoCliente,
        id: proximoId, 
      };

      //5. Agrega el nuevo cliente al principio de la lista
      const listaActualizada = [clienteCreadoCompleto, ...clientesLocales];
      
      //6. Guarda la lista actualizada de vuelta en el localStorage
      localStorage.setItem("clientes", JSON.stringify(listaActualizada));

      //7. Muestra el cartel de éxito con el ID que paso la API
      setTipoMensaje("success");
      setMensajeCartel("Cliente registrado con éxito. ID asignado: " + proximoId);
      setMostrarCartel(true);

      // Limpia todos los campos del formulario
      setNombre("");
      setApellido("");
      setCorreo("");
      setUsuario("");
      setClave("");
      setTelefono("");
      setCiudad("");
      setCalle("");
      setNumero("");
      setCodigoPostal("");

      //Redirige automáticamente a la pantalla de la tabla
      setTimeout(() => {
        navigate("/clientes");
      }, 1500);
    } catch (error) {
      setTipoMensaje("error");
      setMensajeCartel("Error al conectar con el servidor remoto.");
      setMostrarCartel(true);
    }
  };
  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", p: 4 }}>
    <Button
        variant="outlined"
        onClick={() => navigate("/clientes")}
        sx={{ mb: 3 }}
      >
        ← Volver
      </Button>
    <Paper 
      component="form"
      onSubmit={manejarEnvio}
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h6"
        mb={2}
        color="primary"
        sx={{ fontWeight: "bold" }}
      >
        Registrar Nuevo Cliente
      </Typography>

      <Typography variant="subtitle1" color="textSecondary" mb={1}>
        Datos Personales:
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Nombre"
          fullWidth
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Apellido"
          fullWidth
          required
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Teléfono"
          fullWidth
          required
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        color="textSecondary"
        sx={{ mb: 1, mt: 2 }}
      >
        Credenciales de Acceso:
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Nombre de Usuario"
          fullWidth
          required
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          required
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        color="textSecondary"
        sx={{ mb: 1, mt: 2 }}
      >
        Dirección Completa:
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Ciudad"
          fullWidth
          required
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Calle"
          fullWidth
          required
          value={calle}
          onChange={(e) => setCalle(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Número"
          fullWidth
          required
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Código Postal"
          fullWidth
          required
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
          sx={{ mb: 3 }}
        />
      </Box>
      <Button type="submit" variant="contained" color="success" size="medium">
        {" "}
        Guardar Cliente
      </Button>
      </Paper>
      <Snackbar
        open={mostrarCartel}
        autoHideDuration={4000}
        onClose={() => setMostrarCartel(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          variant="filled"
          severity={tipoMensaje}
          onClose={() => setMostrarCartel(false)}
        >
          {mensajeCartel}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormAltaCliente;
