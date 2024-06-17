import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../libs/prisma";



export const createMedia = async (title: string, id: number) => {
  const media: Prisma.MediaCreateInput = {
    title,
    apiID: id
  };

  const newMedia = await prisma.media.create({
    data: {
      title: media.title,
      apiID: media.apiID
    },
  });
  return newMedia;
};

export const deleteMedia = async (req: Request, res: Response) => {};

export const updateMedia = async (req: Request, res: Response) => {};

export const getMedia = async (req: Request, res: Response) => {};
