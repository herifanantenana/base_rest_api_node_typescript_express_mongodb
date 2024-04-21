import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());

export default app;