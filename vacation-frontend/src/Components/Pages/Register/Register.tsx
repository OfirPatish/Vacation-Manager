import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notify from "../../Utils/Notify";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Link, CssBaseline, Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Register.css";

// Define the form inputs type
type UserCredentials = {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};

const theme = createTheme();

function Register(): JSX.Element {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>(); // Initialize react-hook-form

  // Handle form submission
  const handleRegister: SubmitHandler<UserCredentials> = (data) => {
    const registrationData = {
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      email: data.email,
    };

    axios
      .post("http://localhost:8080/auth/register", registrationData)
      .then((response) => {
        notify.success("Registration successful. You can now log in.");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data.msg === "User already exists") {
          notify.error("Email is already taken. Please use a different email.");
        } else {
          notify.error("Registration failed. Please try again.");
        }
      });
  };

  // Validation rules for the form fields
  const validationRules = {
    firstName: { required: true, minLength: 2 },
    lastName: { required: true, minLength: 2 },
    password: { required: true, minLength: 4 },
    email: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ },
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
              backgroundColor: "#2e2e2e",
              color: "#ffffff",
            }}
          >
            <Typography component="h1" variant="h5" color="primary">
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleRegister)} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoComplete="first_name"
                autoFocus
                {...register("first_name", validationRules.firstName)}
                error={!!errors.first_name}
                helperText={errors.first_name ? "First name is required and must be at least 2 characters" : ""}
                InputLabelProps={{ style: { color: "#ffffff" } }}
                sx={{ input: { color: "#ffffff" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                autoComplete="last_name"
                {...register("last_name", validationRules.lastName)}
                error={!!errors.last_name}
                helperText={errors.last_name ? "Last name is required and must be at least 2 characters" : ""}
                InputLabelProps={{ style: { color: "#ffffff" } }}
                sx={{ input: { color: "#ffffff" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                {...register("password", validationRules.password)}
                error={!!errors.password}
                helperText={errors.password ? "Password is required and must be at least 4 characters" : ""}
                InputLabelProps={{ style: { color: "#ffffff" } }}
                sx={{ input: { color: "#ffffff" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email", validationRules.email)}
                error={!!errors.email}
                helperText={errors.email ? "Please enter a valid email address" : ""}
                InputLabelProps={{ style: { color: "#ffffff" } }}
                sx={{ input: { color: "#ffffff" } }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2" sx={{ textAlign: "center", display: "block", width: "100%" }}>
                    Already a member?{" "}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate("/login")}
                      sx={{
                        textDecoration: "none",
                        color: "#90caf9",
                        "&:hover": {
                          textDecoration: "underline",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Login Now
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
