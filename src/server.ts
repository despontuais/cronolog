import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session'; // Importar o express-session
import siteRoutes from './routes/site';
import apiRoutes from './routes/api';
import tmdbRoutes from './routes/tmdb';
import timelineRoutes from './routes/timeline';
import https from 'https';
import http from 'http';
import fs from 'fs';
import logger from './libs/logger';
import * as apiController from './controllers/apiController'; 
import searchRoutes from './routes/searchRoutes';
import './config/passport';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Use cookies seguros em produção
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/login.html')));

app.use('/', searchRoutes);
app.use('/', siteRoutes);
app.use('/api', apiRoutes);
app.use('/tmdb', tmdbRoutes);
app.use('/timeline', timelineRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        logger.info(`Servidor rodando na porta ${port}`);
    });
}

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

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 400);
    res.json({ error: err.message || 'Ocorreu algum erro.' });
}
app.use(errorHandler);
