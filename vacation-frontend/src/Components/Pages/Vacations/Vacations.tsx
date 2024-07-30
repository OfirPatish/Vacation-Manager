import { useEffect, useState } from "react";
import axios from "axios";
import notify from "../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
import { Vacation } from "../../Models/VacationModel";
import { Grid, Container, Box, Typography, Pagination, FormControlLabel, Checkbox, Skeleton } from "@mui/material";
import VacationCard from "../VacationCard/VacationCard";
import { appStore } from "../../Redux/store";

function Vacations(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]); // State to store vacations
  const [page, setPage] = useState(1); // State to manage current page
  const [totalPages, setTotalPages] = useState(1); // State to manage total pages
  const [showFollowing, setShowFollowing] = useState(false); // State to filter following vacations
  const [showUpcoming, setShowUpcoming] = useState(false); // State to filter upcoming vacations
  const [showActive, setShowActive] = useState(false); // State to filter active vacations
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const [reload, setReload] = useState(false); // State to trigger reload
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to fetch vacations from the backend
  const fetchVacations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/vacations`, {
        headers: { Authorization: localStorage.getItem("jwt") || sessionStorage.getItem("jwt") },
        params: {
          page,
          limit: 10,
          showFollowing,
          showUpcoming,
          showActive,
        },
      });
      if (response.data && response.data.vacations) {
        setVacations(response.data.vacations);
        setTotalPages(response.data.totalPages);
      } else {
        setVacations([]);
        setTotalPages(1);
      }
    } catch (error) {
      notify.error("Failed to fetch vacations.");
      setVacations([]);
      setTotalPages(1);
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
    } else {
      fetchVacations();
    }
  }, [navigate, page, showFollowing, showUpcoming, showActive, reload]);

  // Handle follow/unfollow action
  const handleFollow = async (vacation_id: number, isFollowing: boolean) => {
    try {
      const url = `http://localhost:8080/vacations/${isFollowing ? "unfollow" : "follow"}/${vacation_id}`;
      await axios.post(
        url,
        {},
        {
          headers: { Authorization: localStorage.getItem("jwt") || sessionStorage.getItem("jwt") },
        }
      );
      setVacations((prevVacations) =>
        prevVacations.map((vacation) =>
          vacation.vacation_id === vacation_id
            ? { ...vacation, isFollowing: !isFollowing, followers: vacation.followers + (isFollowing ? -1 : 1) }
            : vacation
        )
      );
    } catch (error) {
      notify.error("Failed to update follow status.");
    }
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete action
  const handleDelete = () => {
    setReload(!reload);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Available Vacations
      </Typography>
      <Typography variant="h6" align="center" gutterBottom sx={{ color: "text.secondary" }}>
        Welcome! Choose your next dream vacation from our exclusive offers.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom sx={{ color: "text.secondary", mb: 4 }}>
        Use the filters below to narrow down your search. You can filter vacations by those you are following, upcoming
        vacations, and active vacations.
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        <FormControlLabel
          control={
            <Checkbox checked={showFollowing} onChange={() => setShowFollowing(!showFollowing)} disabled={isAdmin} />
          }
          label="Show Following"
          sx={{ color: "text.primary" }}
        />
        <FormControlLabel
          control={<Checkbox checked={showUpcoming} onChange={() => setShowUpcoming(!showUpcoming)} />}
          label="Show Upcoming"
          sx={{ color: "text.primary" }}
        />
        <FormControlLabel
          control={<Checkbox checked={showActive} onChange={() => setShowActive(!showActive)} />}
          label="Show Active"
          sx={{ color: "text.primary" }}
        />
      </Box>
      {loading ? (
        <Grid container spacing={4}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={300} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={4}>
            {vacations.length > 0 ? (
              vacations.map((vacation) => (
                <Grid item xs={12} sm={6} md={4} key={vacation.vacation_id}>
                  <VacationCard
                    vacation={vacation}
                    handleFollow={handleFollow}
                    isAdmin={isAdmin}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center" sx={{ width: "100%", mt: 4, color: "white" }}>
                No vacations found. Please adjust your filters or try again later.
              </Typography>
            )}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} disabled={loading} />
          </Box>
        </>
      )}
    </Container>
  );
}

export default Vacations;
