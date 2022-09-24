import { IMessage } from "../../interface/message";
import { randomUUID } from "crypto";
import { IMessageRepository, IMessageWithUser } from "../message/IMessageRepository";

export default class MessageInMemory implements IMessageRepository {
  private messages: IMessage[] = [];

  async create(text: string, userId: string): Promise<IMessageWithUser> {
    const toReturn: IMessageWithUser = {
      created_at: new Date(),
      id: randomUUID(),
      text,
      user_id: userId,
      user: {
        avatar_url: randomUUID(),
        github_id: Date.now(),
        login: "myLogin",
        name: "anyName",
        id: userId,
      },
    };
    this.messages.push(toReturn);
    return toReturn;
  }

  async getLastThree(): Promise<IMessage[]> {
    return this.messages.slice(-3);
  }
}
