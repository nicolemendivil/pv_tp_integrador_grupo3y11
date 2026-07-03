import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";
const Footer = () => {
  const integrantes = [
    { nombre: "Debora Chavez", github: "https://github.com/chavezdebora" },
    {
      nombre: "Ezequiel Farfán",
      github: "https://github.com/ezequielfarfan03",
    },
    {
      nombre: "Nicole Mendivil Cabrera",
      github: "https://github.com/nicolemendivil",
    },
  ];
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0a0a0a",
        color: "grey.400",
        py: 5,
        px: 2,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "grey.900",
      }}
    >
      <Container maxWidth="xl">
        {/* Grid moderno de MUI nivelado arriba con flex-start */}
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ textAlign: { xs: "left", md: "right" } }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="body1"
                sx={{ color: "#ffffff", fontWeight: 500 }}
              >
                Trabajo Práctico Integrador -{" "}
                <span style={{ color: "#ffffff", fontWeight: "bold" }}>
                  Grupo 3
                </span>
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "grey.500", letterSpacing: 0.5, mt: 0.5 }}
              >
                Desarrollado con React, Material MUI y FakeStoreAPI
              </Typography>
              <Typography variant="caption" sx={{ color: "grey.600", mt: 0.5 }}>
                &copy; 2026
              </Typography>
            </Stack>
          </Grid>
    
          {/* COLUMNA: Integrantes */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ textAlign: { xs: "left", md: "center" } }}
          >
            <Typography
              variant="caption"
              display="block"
              sx={{
                color: "grey.500",
                mb: 1.5,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600,
              }}
            >
              Integrantes del Grupo
            </Typography>
            <Stack
              direction="column"
              spacing={1}
              justifyContent="center"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              {integrantes.map((alumno, index) => (
                <Link
                  key={index}
                  href={alumno.github}
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                  underline="hover"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: 14, color: "grey.500" }} />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                    {alumno.nombre}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>
          {/* COLUMNA : Universidad */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={0.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <SchoolIcon sx={{ color: '#90caf9', fontSize: 22 }} />
                <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Universidad Nacional de Jujuy
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Programación Visual
              </Typography>
              <Typography variant="caption" sx={{ color: 'grey.500' }}>
                Profesor: Juan Carlos Rodriguez
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
