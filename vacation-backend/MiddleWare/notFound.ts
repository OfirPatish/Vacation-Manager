import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../Models/customErrors";

const handleRouteNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(req.originalUrl);
  next(error);
};

export default handleRouteNotFound;
