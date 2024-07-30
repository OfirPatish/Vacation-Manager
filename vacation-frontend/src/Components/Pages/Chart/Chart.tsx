import { useEffect, useState } from "react";
import axios from "axios";
import notify from "../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
import { Vacation } from "../../Models/VacationModel";
import { Container, Box, Typography, CircularProgress, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { appStore } from "../../Redux/store";

function Chart(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]); // State to store vacations
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to fetch vacations from the backend
  const fetchVacations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/vacations/all`, {
        headers: { Authorization: localStorage.getItem("jwt") || sessionStorage.getItem("jwt") },
      });
      if (response.data && response.data.vacations) {
        setVacations(response.data.vacations);
      } else {
        setVacations([]);
      }
    } catch (error) {
      notify.error("Failed to fetch vacations.");
      setVacations([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to check admin privileges and fetch vacations
  useEffect(() => {
    const state = appStore.getState();
    setIsAdmin(state.auth.role === "Admin");
    if (!validateAndDispatchJWT()) {
      navigate("/login");
    } else if (state.auth.role !== "Admin") {
      notify.error("Access denied. Admin privileges required.");
      navigate("/vacations");
    } else {
      fetchVacations();
    }
  }, [navigate]);

  // Function to truncate long vacation names
  const truncate = (str: string, n: number) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // Function to download CSV
  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," + vacations.map((v) => `${v.destination},${v.followers}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vacations_followers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Vacation Followers Chart
      </Typography>
      {isAdmin && (
        <Box display="flex" justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" onClick={downloadCSV}>
            Download CSV
          </Button>
        </Box>
      )}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={vacations} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="destination"
              tickFormatter={(value) => truncate(value, 10)}
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="followers" fill="#8884d8">
              <LabelList dataKey="followers" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
}

export default Chart;
