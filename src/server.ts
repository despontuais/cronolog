import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import timelineRoutes from "./routes/timeline";
import mediaRoutes from "./routes/media";
import tmdbRoutes from './routes/tmdb';

import https from "https";
import http from "http";
import fs from "fs";
import logger from "./libs/logger";
import { SSL_KEY, SSL_CERT, JWT_SECRET } from "./secrets";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from 'cookie-parser';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "noitulove",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(JWT_SECRET))

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/media", mediaRoutes);
app.use('/tmdb', tmdbRoutes);


const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    logger.info(`Servidor rodando na porta ${port.toString()}`);
  });
};

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT),
  };
  const secServer = https.createServer(options, app);
  runServer(80, regularServer);
  runServer(443, secServer);
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 5000;
  runServer(serverPort, regularServer);
}


const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(400);
  err.message
    ? res.json({ error: err.message })
    : res.json({ error: "Ocorreu algum erro." });
};
app.use(errorHandler);
