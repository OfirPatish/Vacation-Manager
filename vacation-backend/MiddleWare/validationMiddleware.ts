import { Request, Response, NextFunction } from "express";

// Middleware to validate vacation data
export const validateVacationData = (req: Request, res: Response, next: NextFunction) => {
  const { destination, summary, start_date, end_date, price } = req.body;
  if (!destination || !summary || !start_date || !end_date || !price) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  next();
};

// Middleware to validate user data
export const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, password, email } = req.body;

  if (!first_name || !last_name || !password || !email) {
    return res.status(400).json({ msg: "First name, last name, password, and email are required" });
  }

  if (typeof first_name !== "string" || first_name.length < 2) {
    return res.status(400).json({ msg: "First name must be at least 2 characters long" });
  }

  if (typeof last_name !== "string" || last_name.length < 2) {
    return res.status(400).json({ msg: "Last name must be at least 2 characters long" });
  }

  if (typeof password !== "string" || password.length < 4) {
    return res.status(400).json({ msg: "Password must be at least 4 characters long" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  next();
};
