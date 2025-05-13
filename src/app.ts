import express, { Application,  Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


const app: Application = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req: Request, res: Response) => {
  res.send("PH Healthcare Server!");
});

app.use("/api/v1", router);
app.use(globalErrorHandler);

export default app;
