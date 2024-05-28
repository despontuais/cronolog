import dotenv from 'dotenv'
import { query, Request, Response } from 'express'
import { TMDB } from 'tmdb-ts';

const tmdb = new TMDB(process.env.KEY as string);
dotenv.config()

export const search = async (req: Request, res: Response) => {
    const parameters = {
        query: req.query.name as string,
      }
      console.log(parameters);
    try {
        const movies = await tmdb.search.movies({query: parameters.query})
        return res.json(movies.results);
     } catch(err) {
        // handle error
     }
}

export const searchByQuery = async (query: string) => {
    try {
        const movies = await tmdb.search.movies({query, page: 1})
        return JSON.stringify(movies.results);
     } catch(err) {
        // handle error
     }
}
  
export const details = async (req: Request, res: Response) => {
        const query = req.query.id as string;
    try {
        const movies = await tmdb.movies.details(parseInt(query));
        return res.json(movies);
     } catch(err) {
        // handle error
     }
}
  
export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}