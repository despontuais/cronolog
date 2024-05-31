import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import siteRoutes from './routes/site';
import apiRoutes from './routes/api';
import https from 'https';
import http from 'http';
import fs from 'fs';
import logger from './libs/logger';
import * as apiController from './controllers/apiController'; 
// import searchRoutes from './routes/searchRoutes';




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, '../public/login.html')));
app.use(express.urlencoded({extended: true}));
// app.use('/', searchRoutes);

app.use('/', siteRoutes);
app.use('/api', apiRoutes);
app.post('/register', apiController.register);





const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        logger.info(`Servidor rodando na porta ${port}`)
    });
}

const regularServer = http.createServer(app);
if(process.env.NODE_ENV === 'production'){
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

app.use(passport.initialize());

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next) => {
    err.status ? res.status(err.status) : res.status(400);
    err.message ? res.json({error: err.message}) : res.json({ error: 'Ocorreu algum erro.' });
}
app.use(errorHandler);
