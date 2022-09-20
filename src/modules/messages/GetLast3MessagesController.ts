import { Request, Response } from "express";
import { IMessageService } from "./IMessageService";

export class GetLast3MessagesController {
  constructor(private readonly messageService: IMessageService) {}
  async handle(req: Request, res: Response) {
    try {
      const result = await this.messageService.getLast3Messages();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(err.statusCode || 400);
    }
  }
}
