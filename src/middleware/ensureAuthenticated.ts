import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jsonwebtoken";

interface IPayload {
  userId: string;
}

// It must check if the user is authenticated
export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({
      errorCode: "Must provide a valid token!",
    });
  }
  const [, token] = authToken.split(" ");
  try {
    // the verification will return a type equals as IPayload
    const payload = verifyToken(token) as IPayload;
    req.user_id = payload.userId;
    // pass these values to other classes
    return next();
  } catch (error) {
    return res.status(401).json({ errorCode: "token expired" });
  }
}
