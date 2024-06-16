import { Prisma, User } from "@prisma/client";
import { Request, Response } from "express";
import * as TimelineService from "../services/TimelineService";
import logger from "../libs/logger";

export const createTimeline = async (req: Request, res: Response) => {
  const newTimelineParams = req.body;
  const user = req.user as User;
  try {
    const newTimeline = await TimelineService.createTimeline(
      newTimelineParams,
      user.id,
    );
    logger.info({ id: newTimeline.id });
    return res.status(201).json({
      id: newTimeline.id,
      title: newTimeline.title,
      description: newTimeline.description,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.json({ error: error.message });
    }
  }
};

export const createTimelineMedia = async (req: Request, res: Response) => {
  const newTimelineMediaParams = req.body;
  try{
    const newTimeline = await TimelineService.createTimelineMedia(newTimelineMediaParams);
    logger.info({newTimeline})
    return res.json({newTimeline});
  }catch(error){
    if (error instanceof Error){
      logger.error(error.message)
      return res.json({error: error.message})
    }
  }
}

export const deleteTimeline = async (req: Request, res: Response) => {};

export const updateTimeline = async (req: Request, res: Response) => {};

export const getTimeline = async (req: Request, res: Response) => {
  const timelineId = req.params
  const timeline = await TimelineService.getTimeline(parseInt(timelineId.id))
  return res.json({timeline})
};

export const getAllTimelines = async (req: Request, res: Response) => {
    const timelines = await TimelineService.findAll();
  return res.status(200).json({ timelines });
}
