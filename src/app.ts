import express from "express";
import cors from "cors";

import { basicRouter, userRouter, adminRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", basicRouter);
app.use("/users", userRouter);
app.use("/admins", adminRouter);

export { app };
