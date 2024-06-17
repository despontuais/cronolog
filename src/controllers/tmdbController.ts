import { Request, Response } from 'express'
import { TMDB } from 'tmdb-ts';
import { KEY } from '../secrets';
import logger from '../libs/logger';

const tmdb = new TMDB(KEY);


export const search = async (req: Request, res: Response) => {
    const parameters = {
        query: req.title as string,
      }
    try {
        const movies = await tmdb.search.movies({query: parameters.query, page: 1})
        if(movies.total_results !== 0){
           return movies.results;
        }
        const tv = await tmdb.search.tvShows({query: parameters.query, page: 1})
        if(tv.total_results !== 0){
            return tv.results;
        }
     } catch(error) {
        if(error instanceof Error){
            logger.error(error.message)
            return res.json({error: error.message})
        }
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