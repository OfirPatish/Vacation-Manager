import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import notify from "../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Grid, Divider, Paper } from "@mui/material";
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

function AddVacation(): JSX.Element {
  const [uploading, setUploading] = useState(false); // State to manage uploading state
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State to store the selected image file
  const [imageError, setImageError] = useState<string | null>(null); // State to store image error message
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VacationFormInputs>(); // Initialize react-hook-form
  const navigate = useNavigate(); // Hook to navigate programmatically

  // useEffect to check admin privileges
  useEffect(() => {
    const state = appStore.getState();
    setIsAdmin(state.auth.role === "Admin");
    if (!validateAndDispatchJWT()) {
      navigate("/login");
    } else {
      if (state.auth.role !== "Admin") {
        notify.error("Access denied. Admin privileges required.");
        navigate("/vacations");
      }
    }
  }, [navigate]);

  // Handle image change event
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setImageError("Only image files (jpeg, png, gif) are allowed");
        setSelectedImage(null);
        return;
      }
      setSelectedImage(file);
      setImageError(null); // Clear any previous image error
      notify.success("Image selected. Click 'Add Vacation' to apply changes.");
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<VacationFormInputs> = async (data) => {
    if (!selectedImage) {
      setImageError("Image is required");
      return;
    }
    setImageError(null);

    const formData = new FormData();
    formData.append("destination", data.destination);
    formData.append("summary", data.summary);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("price", data.price.toString());
    if (selectedImage) {
      const newFileName = `${data.destination.toLowerCase()}${selectedImage.name.substring(
        selectedImage.name.lastIndexOf(".")
      )}`;
      const renamedFile = new File([selectedImage], newFileName, { type: selectedImage.type });
      formData.append("image", renamedFile);
    }
    setUploading(true);
    try {
      await axios.post(`http://localhost:8080/vacations/add`, formData, {
        headers: {
          Authorization: localStorage.getItem("jwt") || sessionStorage.getItem("jwt"),
        },
      });
      notify.success("Vacation added successfully!");
      navigate("/vacations");
    } catch (error) {
      notify.error("Failed to add vacation.");
    } finally {
      setUploading(false);
    }
  };

  const startDate = watch("start_date"); // Watch the start_date field for validation

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}>
          Add Vacation
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
                <Button variant="contained" component="label" fullWidth>
                  Upload Image
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
                {imageError && (
                  <Typography color="error" variant="body2" align="center">
                    {imageError}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={uploading}>
                  {uploading ? "Adding..." : "Add Vacation"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddVacation;
