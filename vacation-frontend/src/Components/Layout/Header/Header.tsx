import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { appStore } from "../../Redux/store";
import { createUserLogoutAction } from "../../Redux/AuthReducer";
import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
import notify from "../../Utils/Notify";
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, Divider } from "@mui/material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import "./Header.css";

function Header(): JSX.Element {
  const [isLogged, setLogged] = useState(false); // State to manage login status
  const [firstName, setFirstName] = useState(appStore.getState().auth.first_name); // State to store first name
  const [lastName, setLastName] = useState(appStore.getState().auth.last_name); // State to store last name
  const [isUser, setIsUser] = useState(false); // State to check if the user is a regular user
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const isValid = validateAndDispatchJWT(); // Validate JWT and dispatch if valid
    setLogged(isValid);
    const state = appStore.getState();
    setFirstName(state.auth.first_name);
    setLastName(state.auth.last_name);
    setLogged(state.auth.jwt.length > 0);
    switch (state.auth.role) {
      case "Admin":
        setIsAdmin(true);
        break;
      case "User":
        setIsUser(true);
        break;
      default:
        setIsAdmin(false);
        setIsUser(false);
    }
  }, []);

  // Subscribe to store updates
  appStore.subscribe(() => {
    const state = appStore.getState();
    setLogged(state.auth.jwt.length > 0);
    setFirstName(state.auth.first_name);
    setLastName(state.auth.last_name);
    switch (state.auth.role) {
      case "Admin":
        setIsAdmin(true);
        break;
      case "User":
        setIsUser(true);
        break;
      default:
        setIsAdmin(false);
        setIsUser(false);
    }
  });

  // Handle logout action
  const handleLogout = () => {
    appStore.dispatch(createUserLogoutAction());
    notify.info("You have been logged out.");
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
      <Toolbar sx={{ color: "#ffffff", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BeachAccessIcon className="beachIcon" sx={{ marginRight: 1 }} />
          <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
          {(isUser || isAdmin) && <MenuItem onClick={() => navigate("/vacations")}>Vacations</MenuItem>}
          {isAdmin && (
            <>
              <MenuItem onClick={() => navigate("/addVacation")}>Add Vacation</MenuItem>
              <MenuItem onClick={() => navigate("/chart")}>Chart</MenuItem>
            </>
          )}
        </Box>
        <Typography variant="h6" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          Vacation Management
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Hello {firstName} {isLogged && lastName}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginX: 2, backgroundColor: "white", height: 24, alignSelf: "center" }}
          />
          {isLogged ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
