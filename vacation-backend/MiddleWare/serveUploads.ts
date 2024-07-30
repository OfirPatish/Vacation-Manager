import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

const serveUploads = (req: Request, res: Response, next: NextFunction) => {
  const urlPath = req.url.replace(/^\/uploads/, "");
  const filePath = path.join(__dirname, "..", "uploads", urlPath);
  //console.log(`Serving file from path: ${filePath}`);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${filePath}`);
      return res.status(404).send("File not found");
    }
    next();
  });
};

export default serveUploads;
