import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import config from "./config";

const app: Application = express();
const port = config.port || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware to parse cookies to access them in req.cookies in JWT controller authentication
app.use(cookieParser());

app.post("/", (req: Request, res: Response) => {
  res.send("PH Healthcare Server!");
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    error: {
      path: req.originalUrl,
      message: "Path Not Found",
    },
  });
  next();
});

export default app;
