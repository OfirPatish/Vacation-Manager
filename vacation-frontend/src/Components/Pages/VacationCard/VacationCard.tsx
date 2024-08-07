import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Vacation } from "../../Models/VacationModel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import notify from "../../Utils/Notify";
import "../../Styles/CustomScrollbar.css";

// Define the props for the VacationCard component
interface VacationCardProps {
  vacation: Vacation;
  handleFollow: (vacation_id: number, isFollowing: boolean) => void;
  isAdmin: boolean;
  onDelete: () => void;
}

const VacationCard: React.FC<VacationCardProps> = ({ vacation, handleFollow, isAdmin, onDelete }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [open, setOpen] = useState(false); // State to manage the dialog open/close

  // Handle edit button click
  const handleEdit = () => {
    navigate(`/editVacation/${vacation.vacation_id}`);
  };

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/vacations/delete/${vacation.vacation_id}`, {
        headers: { Authorization: localStorage.getItem("jwt") || sessionStorage.getItem("jwt") },
      });
      notify.success("Vacation deleted successfully.");
      setOpen(false);
      onDelete();
    } catch (error) {
      notify.error("Failed to delete vacation.");
    }
  };

  // Open the confirmation dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the confirmation dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        height: 550,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, boxShadow 0.3s ease",
        backgroundColor: "#2a2a2a",
        color: "#ffffff",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="50%"
        image={`http://localhost:8080/uploads/${vacation.image_name}`}
        alt={vacation.destination}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          padding: 2,
          background: "#2a2a2a",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {vacation.destination}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary" ml={1}>
              {new Date(vacation.start_date).toLocaleDateString()} - {new Date(vacation.end_date).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            mb={2}
            sx={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              maxHeight: "120px",
              overflowY: "auto",
            }}
            className="custom-scrollbar"
          >
            {vacation.summary}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mt: 2 }}>
          ${vacation.price}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {isAdmin ? (
          <>
            <Tooltip title="Edit" arrow>
              <IconButton
                color="info"
                onClick={handleEdit}
                sx={{
                  backgroundColor: "rgba(50, 50, 50, 0.8)",
                  "&:hover": { backgroundColor: "rgba(50, 50, 50, 0.85)" },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton
                color="error"
                onClick={handleClickOpen}
                sx={{
                  backgroundColor: "rgba(50, 50, 50, 0.8)",
                  "&:hover": { backgroundColor: "rgba(50, 50, 50, 0.85)" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Followers" arrow>
              <Box
                sx={{
                  backgroundColor: "rgba(50, 50, 50, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 10px",
                  borderRadius: "20px",
                }}
              >
                <FavoriteIcon color="disabled" />
                <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                  {vacation.followers}
                </Typography>
              </Box>
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this vacation?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <Tooltip title={vacation.isFollowing ? "Unfollow" : "Follow"} arrow>
            <IconButton
              onClick={() => handleFollow(vacation.vacation_id, vacation.isFollowing)}
              color={vacation.isFollowing ? "secondary" : "default"}
              sx={{
                backgroundColor: "rgba(50, 50, 50, 0.8)",
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(50, 50, 50, 1)",
                  boxShadow: 6,
                },
                "&.followed": {
                  color: "primary.main",
                  backgroundColor: "rgba(50, 50, 50, 1)",
                },
              }}
            >
              {vacation.isFollowing ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                {vacation.followers}
              </Typography>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
};

export default VacationCard;
