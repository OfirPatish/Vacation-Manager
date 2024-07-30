import MainRoute from "../../Routes/MainRoute/MainRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../../Styles/ThemeContext";

function MainLayout(): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gridTemplateColumns: "1fr",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <header className="main-header">
            <Header />
          </header>
        </Box>
        <Container
          component="main"
          sx={{
            padding: "10px",
            marginTop: "80px",
            marginBottom: "120px",
          }}
        >
          <MainRoute />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default MainLayout;
