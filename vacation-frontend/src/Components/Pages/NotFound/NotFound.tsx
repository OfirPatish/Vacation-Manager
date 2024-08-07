import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
import { Container, Typography, Link, Box } from "@mui/material";

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!validateAndDispatchJWT()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container sx={{ textAlign: "center", padding: "50px", color: "#ffffff" }}>
      <Typography variant="h1" sx={{ fontSize: "48px", color: "#ff0000", marginBottom: "20px" }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", color: "#ffffff", marginBottom: "10px" }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", color: "#ffffff" }}>
        Please check the URL or return to the{" "}
        <Link href="/" sx={{ color: "#007bff", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
          home page
        </Link>
        .
      </Typography>
    </Container>
  );
}

export default NotFound;
