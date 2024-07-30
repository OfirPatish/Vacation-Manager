import express, { Request, Response } from "express";
import {
  getAllVacations,
  getAllVacationsNoPagination,
  addVacation,
  getVacationById,
  updateVacation,
  deleteVacation,
  followVacation,
  unfollowVacation,
} from "../Logic/vacationService";
import { validateToken } from "../Utils/JWTService";
import { validateVacationData } from "../MiddleWare/validationMiddleware";
import { VacationAlreadyExists, VacationNotFound } from "../Models/customErrors";
import fileUpload from "express-fileupload";
import path from "path";
import { handleFileUpload } from "../Utils/fileUploadUtil";

const vacationRouter = express.Router();

// Route to get all vacations with optional filters
vacationRouter.get("/", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const showFollowing = req.query.showFollowing === "true";
  const showUpcoming = req.query.showUpcoming === "true";
  const showActive = req.query.showActive === "true";

  try {
    const { vacations, totalPages } = await getAllVacations(
      user.user_id,
      page,
      limit,
      showFollowing,
      showUpcoming,
      showActive
    );
    res.status(200).json({ vacations, totalPages });
  } catch (error) {
    console.error("Error fetching vacations:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Route to get all vacations without pagination
vacationRouter.get("/all", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user) {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    const vacations = await getAllVacationsNoPagination();
    res.status(200).json({ vacations });
  } catch (error) {
    console.error("Error fetching vacations:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Route to get a vacation by its ID
vacationRouter.get("/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user) {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {
    const vacation = await getVacationById(parseInt(req.params.id));
    if (!vacation) {
      return res.status(404).json({ msg: "Vacation not found" });
    }
    res.status(200).json(vacation);
  } catch (error) {
    console.error("Error fetching vacation:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Route to add a new vacation
vacationRouter.post("/add", validateVacationData, async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user || user.role !== "Admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    let image_name = "";
    if (req.files && req.files.image) {
      const file = req.files.image as fileUpload.UploadedFile;
      image_name = await handleFileUpload(file, req.body.destination);
    }

    const vacationData = {
      ...req.body,
      image_name,
    };

    const result = await addVacation(vacationData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding vacation:", error);
    if (error instanceof VacationAlreadyExists) {
      res.status(error.statusCode).json({ msg: error.errorMessage });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

// Route to update an existing vacation
vacationRouter.put("/update/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user || user.role !== "Admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    const vacationId = parseInt(req.params.id);
    const { destination, summary, start_date, end_date, price } = req.body;

    let image_name = "";
    if (req.files && req.files.image) {
      const file = req.files.image as fileUpload.UploadedFile;
      image_name = await handleFileUpload(file, destination);
    }

    const updatedVacation = {
      destination,
      summary,
      start_date,
      end_date,
      price,
      image_name: image_name || undefined,
    };

    await updateVacation(vacationId, updatedVacation);
    res.status(200).json({ msg: "Vacation updated successfully" });
  } catch (error) {
    console.error("Error updating vacation:", error);
    if (error instanceof VacationNotFound) {
      res.status(error.statusCode).json({ msg: error.errorMessage });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

// Route to delete a vacation
vacationRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user || user.role !== "Admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    await deleteVacation(parseInt(req.params.id));
    res.status(200).json({ msg: "Vacation deleted successfully" });
  } catch (error) {
    console.error("Error deleting vacation:", error);
    if (error instanceof VacationNotFound) {
      res.status(error.statusCode).json({ msg: error.errorMessage });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

// Route to follow a vacation
vacationRouter.post("/follow/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user) {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    await followVacation(user.user_id, parseInt(req.params.id));
    res.status(200).json({ msg: "Vacation followed successfully" });
  } catch (error) {
    console.error("Error following vacation:", error);
    if (error instanceof Error && error.message === "User already follows this vacation") {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

// Route to unfollow a vacation
vacationRouter.post("/unfollow/:id", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ msg: "Access denied" });
  }
  const user = validateToken(token);
  if (!user) {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    await unfollowVacation(user.user_id, parseInt(req.params.id));
    res.status(200).json({ msg: "Vacation unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing vacation:", error);
    if (error instanceof Error && error.message === "User does not follow this vacation") {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

export default vacationRouter;
