import { Request, Response } from "express";
import { CreateMessageService } from "./CreateMessageService";

class CreateMessageController {
  async handle(req: Request, resp: Response) {
    const { message } = req.body;
    const { user_id } = req;
    const service = new CreateMessageService();

    const result = await service.execut(message, user_id);

    return resp.json(result);
  }
}
export { CreateMessageController };