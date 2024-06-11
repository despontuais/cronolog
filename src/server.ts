import express, { Request, Response, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import https from "https";
import http from "http";
import fs from "fs";
import logger from "./libs/logger";
import { SSL_KEY, SSL_CERT } from "./secrets";
import bodyParser from "body-parser";
import searchRoutes from './routes/searchRoutes'; // Importa a rota de busca
import cookieParser from 'cookie-parser';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

dotenv.config();

const app = express();

// Configuração de CORS para permitir requisições do frontend
const allowedOrigins = ['http://localhost:8080'];

const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
            callback(null, true); // Permite requisições de origens permitidas
        } else {
            callback(new Error('Not allowed by CORS')); // Bloqueia outras origens
        }
    },
    credentials: true // Permite o envio de cookies e cabeçalhos de autenticação
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Analisa cookies

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/search', searchRoutes); // Adiciona a rota de busca


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

app.use(passport.initialize());

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
) => {
  res.status(400);
  err.message
    ? res.json({ error: err.message })
    : res.json({ error: "Ocorreu algum erro." });
};
app.use(errorHandler);
