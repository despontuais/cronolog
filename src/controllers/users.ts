import { Request, Response } from "express";
import * as UserService from "../services/UserService";

export const ping = (req: Request, res: Response) => {
  return res.json({ pong: true });
};

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await UserService.findById(id);
  return res.status(200).json({ test: user });
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await UserService.findAll();
  return res.status(200).json({ users });
};
