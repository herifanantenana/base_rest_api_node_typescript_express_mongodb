import { createUser, getUserByEmail } from "../services/user.service";
import { Request, Response} from "express";
import { authentication, random } from "../helpers";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email, 
      username,
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}