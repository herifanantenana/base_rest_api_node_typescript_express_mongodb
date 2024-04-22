import { createUser, getUserByEmail } from "../services/user";
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
    const user: any = await createUser({
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication?.salt || '', password);

    if (user.authentication?.password !== expectedHash) {
      return res.sendStatus(401);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    await user.save();

    res.cookie("secret", user.authentication.sessionToken, {
      domain: "localhost"
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}