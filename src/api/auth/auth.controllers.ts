import { Request, Response } from "express";
import Users from "../users/user.model.js";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET is not defined");
      throw new Error("JWT_SECRET is not defined");
    }

    const user = await Users.findOne({ username: req.body.username });

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    if (await verify(user.password, req.body.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          iat: Date.now(),
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        process.env.JWT_SECRET,
      );

      return res.status(200).json({ token, user });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export { login };
