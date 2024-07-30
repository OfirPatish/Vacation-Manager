import express, { Request, Response } from "express";
import { authenticateUser, registerUser } from "../Logic/userService";
import { validateUserData } from "../MiddleWare/validationMiddleware";
import { validateToken } from "../Utils/JWTService";
import { UserNotLogged, UserNotFound, InvalidPasswordError } from "../Models/customErrors";

const authRouter = express.Router();

// Route to handle user login
authRouter.post("/login", async (req: Request, res: Response) => {
  const credentials = req.body;
  try {
    const userData = await authenticateUser(credentials);
    if (userData && validateToken(userData.jwt)) {
      res
        .status(200)
        .header("Access-Control-Expose-Headers", "Authorization")
        .header("Authorization", userData.jwt)
        .json(userData);
    } else {
      const error = new UserNotLogged();
      res.status(error.statusCode).json({ msg: error.errorMessage });
    }
  } catch (error) {
    if (error instanceof UserNotFound) {
      res.status(error.statusCode).json({ msg: error.errorMessage });
    } else if (error instanceof InvalidPasswordError) {
      res.status(error.statusCode).json({ msg: error.errorMessage });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

// Route to handle user registration
authRouter.post("/register", validateUserData, async (req: Request, res: Response) => {
  try {
    let result = await registerUser(req.body);
    if (result === "User was created") {
      res.status(201).json({ msg: result });
    } else {
      res.status(400).json({ msg: result });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default authRouter;
