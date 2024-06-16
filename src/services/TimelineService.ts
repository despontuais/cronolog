import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../libs/prisma";

export const createTimeline = async (
  timelineParams: Prisma.TimelineCreateInput,
 userId: number,
) => {
  const timeline: Prisma.TimelineCreateInput = {
    title: timelineParams.title,
    description: timelineParams.description,
    users: timelineParams.users,
  };

  const newTimeline = await prisma.timeline.create({
    data: {
      title: timeline.title,
      description: timeline.description,
      users: { connect: { id: userId } },
    },
  });
  return newTimeline;
};

export const createTimelineMedia = async (timelineMediaParams : Prisma.Media_TimelineCreateManyInput) => {
  const timelineMedia : Prisma.Media_TimelineCreateInput = {
    //refactor later
      timeline: {connect: {id: parseInt(timelineMediaParams.timeline_id.toString())}
      },
      media: {connect: {id: parseInt(timelineMediaParams.media_timeline_id.toString())}
      }
  }
  const newTimelineMedia = await prisma.media_Timeline.create({
    data: { 
      timeline : timelineMedia.timeline,
      media: timelineMedia.media
    },
  });
  return newTimelineMedia;
}

export const deleteTimeline = async (req: Request, res: Response) => {};

export const updateTimeline = async (req: Request, res: Response) => {};

export const getTimeline = async (id: number) => {
    return await prisma.media_Timeline.findMany({include: {media: true, timeline: {select: {title: true}}}});
    //return await prisma.media_Timeline.findFirst({where: {timeline_id: id}, include: {timeline: true, media: true}})
    //return await prisma.timeline.findFirst({ where: {id},include: {media_timeline: true}})
  };

export const findAll = async () => {
  return await prisma.timeline.findMany({select: {title: true}})
}
