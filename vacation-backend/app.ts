import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/databaseConfig";
import handleRouteNotFound from "./MiddleWare/notFound";
import authRouter from "./Routes/authRoutes";
import vacationRouter from "./Routes/vacationRoutes";
import path from "path";
import serveUploads from "./MiddleWare/serveUploads";

// Create server
const app = express();

// Configure CORS with options
const corsOptions = {
  origin: "http://localhost:3000", // Allow only your frontend application
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  optionSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

// Log all requests to the static file server
// app.use((req, res, next) => {
//   console.log(`Request for ${req.url}`);
//   next();
// });

// Serve static files from the "upload" directory
app.use("/uploads", serveUploads);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up routes
app.use("/auth", authRouter);
app.use("/vacations", vacationRouter);

// 404 handler
app.use("*", handleRouteNotFound);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error occurred during request for ${req.url}`);
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(config.port, () => {
  console.log(`Listening on http://${config.host}:${config.port}`);
});

// import cors from "cors";
// import express, { Request, Response, NextFunction } from "express";
// import fileUpload from "express-fileupload";
// import config from "./Utils/databaseConfig";
// import handleRouteNotFound from "./MiddleWare/notFound";
// import authRouter from "./Routes/authRoutes";
// import vacationRouter from "./Routes/vacationRoutes";
// import path from "path";
// import serveUploads from "./MiddleWare/serveUploads";

// // Create server
// const app = express();

// // Configure CORS
// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   exposedHeaders: ["Authorization"],
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(fileUpload({ createParentPath: true }));

// // Log all requests to the static file server
// // app.use((req, res, next) => {
// //   console.log(`Request for ${req.url}`);
// //   next();
// // });

// // Serve static files from the "upload" directory
// app.use("/uploads", serveUploads);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Set up routes
// app.use("/auth", authRouter);
// app.use("/vacations", vacationRouter);

// // 404 handler
// app.use("*", handleRouteNotFound);

// // Error handling middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(`Error occurred during request for ${req.url}`);
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // Start the server
// app.listen(config.port, () => {
//   console.log(`Listening on http://${config.host}:${config.port}`);
// });
