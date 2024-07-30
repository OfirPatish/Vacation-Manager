import axios from "axios";
import notify from "../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { appStore } from "../../Redux/store";
import { createUserLoginAction } from "../../Redux/AuthReducer";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  CssBaseline,
  Grid,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login.css";

const theme = createTheme();

function Login(): JSX.Element {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Define the form inputs type
  type UserCredentials = {
    email: string;
    password: string;
    rememberMe: boolean;
  };

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>();

  // Handle form submission
  const handleLogin: SubmitHandler<UserCredentials> = (credentials) => {
    axios
      .post("http://localhost:8080/auth/login", {
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        appStore.dispatch(createUserLoginAction(response.data)); // Dispatch login action
        const token = response.headers["authorization"];
        if (credentials.rememberMe) {
          localStorage.setItem("jwt", token); // Store token in localStorage if "Remember me" is checked
        } else {
          localStorage.removeItem("jwt");
          sessionStorage.setItem("jwt", token); // Store token in sessionStorage otherwise
        }
        notify.success("Welcome back!");
        navigate("/vacations"); // Navigate to vacations page
      })
      .catch((error) => {
        if (error.response && error.response.data.msg === "User not found") {
          notify.error("Email not found. Please try again.");
        } else if (error.response && error.response.data.msg === "Invalid password") {
          notify.error("Invalid password. Please try again.");
        } else {
          notify.error("An error occurred. Please try again later.");
        }
      });
  };

  // Validation rules for the form fields
  const validationRules = {
    email: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ },
    password: { required: true, minLength: 5, maxLength: 10 },
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
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email", validationRules.email)}
                error={!!errors.email}
                helperText={errors.email ? "Please enter a valid email address." : ""}
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
                helperText={errors.password ? "Please enter a valid password (5-10 characters)." : ""}
                InputLabelProps={{ style: { color: "#ffffff" } }}
                sx={{ input: { color: "#ffffff" } }}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Checkbox {...register("rememberMe")} color="primary" />}
                  label="Remember me"
                />
              </Box>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2" sx={{ textAlign: "center", display: "block", width: "100%" }}>
                    Not a member?{" "}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate("/register")}
                      sx={{
                        textDecoration: "none",
                        color: "#90caf9",
                        "&:hover": {
                          textDecoration: "underline",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Register Now
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

export default Login;
