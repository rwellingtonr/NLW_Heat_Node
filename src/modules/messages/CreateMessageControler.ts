import { Request, Response } from "express";
import { IMessageService } from "./IMessageService";

export class CreateMessageController {
  constructor(private readonly messageService: IMessageService) {}
  async handle(req: Request, res: Response) {
    try {
      const { message } = req.body;
      const { user_id } = req;

      const result = await this.messageService.create(message, user_id);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(err.statusCode || 400).send({ message: err });
    }
  }
}
