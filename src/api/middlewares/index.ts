import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../services/user";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["secret"];
    if (!sessionToken) {
      return res.sendStatus(401);
    }
    
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(401);
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(401);
  }
}

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as unknown;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}