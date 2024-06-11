import express, { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import https from 'https';
import http from 'http';
import fs from 'fs';
import logger from './libs/logger';
import searchRoutes from './routes/searchRoutes'; // Importa a rota de busca
import cookieParser from 'cookie-parser';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

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

app.use(cors(corsOptions)); // Aplica as configurações de CORS
app.use(express.json()); // Analisa JSON
app.use(express.urlencoded({ extended: true })); // Analisa URLs codificadas
app.use(cookieParser()); // Analisa cookies

// Configura as rotas da API
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/search', searchRoutes); // Adiciona a rota de busca

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        logger.info(`Servidor rodando na porta ${port}`) // Loga a inicialização do servidor
    });
}

// Cria servidores HTTP e HTTPS dependendo do ambiente
const regularServer = http.createServer(app);
if (process.env.NODE_ENV === 'production') {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string)
    }
    const secServer = https.createServer(options, app);
    runServer(80, regularServer);
    runServer(443, secServer);
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    runServer(serverPort, regularServer);
}

app.use(passport.initialize()); // Inicializa o Passport para autenticação

// Middleware de tratamento de erros
const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next) => {
    res.status(err.status || 400).json({ error: err.message || 'Ocorreu algum erro.' });
}
app.use(errorHandler); // Aplica o middleware de tratamento de erros
