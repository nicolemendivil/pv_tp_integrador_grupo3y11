import React from "react";
import { Box, Typography, Container } from "@mui/material";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary">
          © 2026 - Trabajo Práctico Integrador - Programación Visual - Grupo 3 y 11
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          display="block"
          sx={{ mt: 0.5 }}
        >
          Desarrollado con React, Material UI y FakeStoreAPI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
