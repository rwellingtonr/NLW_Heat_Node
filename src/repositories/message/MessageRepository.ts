import prismaClient from "../../../prisma";
import { IMessage } from "../../interface/message";
import { IMessageRepository, IMessageWithUser } from "./IMessageRepository";

export default class MessageRepository implements IMessageRepository {
  async create(text: string, userId: string): Promise<IMessageWithUser> {
    const message = await prismaClient.message.create({
      data: { text, user_id: userId },
      include: { user: true },
    });
    return message;
  }

  async getLastThree(): Promise<IMessage[]> {
    return await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });
  }
}
