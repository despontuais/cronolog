import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import apiRoutes from './routes/api';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(passport.initialize());

server.use('/api', apiRoutes);

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next) => {
    err.status ? res.status(err.status) : res.status(400);
    err.message ? res.json({error: err.message}) : res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(process.env.PORT);