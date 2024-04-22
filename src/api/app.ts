import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import router from "./routers";

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use('/', router())

export default app;