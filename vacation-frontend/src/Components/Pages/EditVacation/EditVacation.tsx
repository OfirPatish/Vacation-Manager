import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import notify from "../../Utils/Notify";
import { useNavigate, useParams } from "react-router-dom";
import { Vacation } from "../../Models/VacationModel";
import { Container, Typography, Box, CircularProgress, TextField, Button, Grid, Divider, Paper } from "@mui/material";
import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
import { appStore } from "../../Redux/store";
import "../../Styles/CustomScrollbar.css";

// Define the form inputs type
type VacationFormInputs = {
  destination: string;
  summary: string;
  start_date: string;
  end_date: string;
  price: number;
  image: FileList;
};

function EditVacation(): JSX.Element {
  const { id } = useParams<{ id: string }>(); // Get the vacation ID from the URL parameters
  const [vacation, setVacation] = useState<Vacation | null>(null); // State to store vacation details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [uploading, setUploading] = useState(false); // State to manage uploading state
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State to store the selected image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to store the image preview URL

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VacationFormInputs>();

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to fetch vacation details from the backend
  const fetchVacation = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/vacations/${id}`, {
        headers: { Authorization: localStorage.getItem("jwt") || sessionStorage.getItem("jwt") },
      });
      const vacationData = response.data;
      setVacation(vacationData);

      // Format date to YYYY-MM-DD
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().split("T")[0];
      };

      // Set form values with fetched data
      setValue("destination", vacationData.destination);
      setValue("summary", vacationData.summary);
      setValue("start_date", formatDate(vacationData.start_date));
      setValue("end_date", formatDate(vacationData.end_date));
      setValue("price", vacationData.price);
      setImagePreview(`http://localhost:8080/uploads/${vacationData.image_name}`);
    } catch (error) {
      notify.error("Failed to fetch vacation details.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to check admin privileges and fetch vacation details
  useEffect(() => {
    const state = appStore.getState();
    setIsAdmin(state.auth.role === "Admin");

    if (!validateAndDispatchJWT()) {
      navigate("/login");
    } else {
      if (state.auth.role !== "Admin") {
        notify.error("Access denied. Admin privileges required.");
        navigate("/vacations");
      } else {
        fetchVacation();
      }
    }
  }, [id, setValue, navigate]);

  // Handle image change event
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      notify.success("Image selected. Click 'Update Vacation' to apply changes.");
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<VacationFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("destination", data.destination);
    formData.append("summary", data.summary);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("price", data.price.toString());

    // Append the selected image to the form data
    if (selectedImage) {
      const newFileName = `${data.destination.toLowerCase()}${selectedImage.name.substring(
        selectedImage.name.lastIndexOf(".")
      )}`;
      const renamedFile = new File([selectedImage], newFileName, { type: selectedImage.type });
      formData.append("image", renamedFile);
    }

    setUploading(true);

    try {
      await axios.put(`http://localhost:8080/vacations/update/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("jwt") || sessionStorage.getItem("jwt"),
        },
      });
      notify.success("Vacation updated successfully!");
      navigate("/vacations");
    } catch (error) {
      notify.error("Failed to update vacation.");
    } finally {
      setUploading(false);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const startDate = watch("start_date"); // Watch the start_date field for validation
  const isPastVacation = vacation && new Date(vacation.start_date) < new Date(); // Check if the vacation is in the past

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}>
          Edit Vacation
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Destination"
                variant="outlined"
                {...register("destination", { required: "Destination is required" })}
                error={!!errors.destination}
                helperText={errors.destination?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Summary"
                variant="outlined"
                multiline
                rows={4}
                {...register("summary", { required: "Summary is required" })}
                error={!!errors.summary}
                helperText={errors.summary?.message}
                className="custom-scrollbar"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("start_date", {
                  required: "Start date is required",
                  validate: (value) => {
                    if (isPastVacation) return true;
                    const today = new Date().toISOString().split("T")[0];
                    return value >= today || "Start date cannot be in the past";
                  },
                })}
                error={!!errors.start_date}
                helperText={errors.start_date?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("end_date", {
                  required: "End date is required",
                  validate: (value) => {
                    return value >= startDate || "End date cannot be before start date";
                  },
                })}
                error={!!errors.end_date}
                helperText={errors.end_date?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                variant="outlined"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                  max: { value: 10000, message: "Price cannot exceed 10,000" },
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            <Grid item xs={12} container justifyContent="center">
              <Grid item xs={10} sm={4} md={3}>
                {imagePreview && (
                  <Box display="flex" justifyContent="center" mb={2} flexDirection="column" alignItems="center">
                    <img
                      src={imagePreview}
                      alt="Vacation"
                      style={{ width: "200%", cursor: "pointer", borderRadius: "8px" }}
                      onClick={() => document.getElementById("imageInput")?.click()}
                    />
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Click image to change cover
                    </Typography>
                  </Box>
                )}
                <input type="file" hidden id="imageInput" onChange={handleImageChange} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} container justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={uploading}>
                  {uploading ? "Updating..." : "Update Vacation"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default EditVacation;
