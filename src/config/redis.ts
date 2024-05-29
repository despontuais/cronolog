import express from 'express';
import redis from 'redis';
import { Request, Response, NextFunction } from 'express';

const redisClient = redis.createClient();

const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = `__express__${req.originalUrl || req.url}`;
    redisClient.get(key, (err, cachedData) => {
        if (err) throw err;
        if (cachedData) {
            res.send(cachedData);
        } else {
            res.sendResponse = res.send;
            res.send = (body: any) => {
                redisClient.setex(key, 3600, body);
                res.sendResponse(body);
            };
            next();
        }
    });
};

export default cacheMiddleware;
