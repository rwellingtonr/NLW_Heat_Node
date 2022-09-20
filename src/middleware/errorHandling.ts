import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

interface IErrorHandling {
  (err: Error, req: Request, res: Response, next: NextFunction): Response | void;
}

const errorHandling: IErrorHandling = (err, req, res, next) => {
  logger.error(err);
  if (err instanceof Error) return next(err);
  return res.status(500).send({ error: err });
};

export default errorHandling;
