import { Request, Response } from "express";

interface Controller {
  handle(req: Request, res: Response): Promise<Response>;
}

export default function controllerAdapter(controller: Controller) {
  return async (req: Request, res: Response) => await controller.handle(req, res);
}
