import { Request, Response } from "express";
import * as UserService from "../services/UserService";
import logger from "../libs/logger";
import { Prisma } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

//this type is being declared in "auth.ts" and "UserService.ts"
interface UserLoginInput {
  email?: string;
  username?: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const newUserParams: Prisma.UserCreateInput =
    req.body as Prisma.UserCreateInput;
  try {
    const newUser = await UserService.createUser(newUserParams);
    logger.info({ id: newUser.id });
    return res.status(201).json({ id: newUser.id });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const userParams: UserLoginInput = req.body as UserLoginInput;
  try {
    const user = await UserService.loginUser(userParams);
    const parsedResult = JSON.parse(user);
    return res.status(200).json(parsedResult);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.json({ status: false, error: error.message });
    }
  }
};

export const me = (req: Request, res: Response) => {
  return res.json(req.user);
};
