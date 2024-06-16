import {  Prisma, User } from "@prisma/client";
import { Request, Response } from "express";
import * as MediaService from '../services/MediaService'
import logger from "../libs/logger";
import { search } from "./tmdbController";

export const createMedia = async (req: Request, res: Response) => {
  //refactor later
  const mediaQuery : any = await search(req.body, res);
  try {
    //refactor later
    if(!mediaQuery){
      throw new Error("Não foi possivel encontrar a midia")
    }
    const media : Prisma.MediaCreateInput = {
      title: mediaQuery.at(0)?.title || mediaQuery.at(0)?.name,
      apiID: mediaQuery.at(0)?.id
    };
    console.log(media)
    const newMedia = await MediaService.createMedia(media.title as string, media.apiID as number);
    logger.info({ id: newMedia.id });
    return res.status(201).json({
      id: newMedia.id,
      title: newMedia.title,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.json({ error: error.message });
    }
  }
};

export const deleteTimeline = async (req: Request, res: Response) => {};

export const updateTimeline = async (req: Request, res: Response) => {};

export const getTimeline = async (req: Request, res: Response) => {};
