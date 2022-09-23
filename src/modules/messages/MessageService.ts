import { io } from "../../app";
import { IMessage } from "../../interface/message";
import {
  IMessageRepository,
  IMessageWithUser,
} from "../../repositories/message/IMessageRepository";
import { IMessageService } from "./IMessageService";

export class MessageService implements IMessageService {
  constructor(private readonly messageRepository: IMessageRepository) {}
  async create(message: string, userId: string): Promise<IMessageWithUser> {
    const createdMessage = await this.messageRepository.create(message, userId);

    const infoWS = {
      text: createdMessage.text,
      user_id: createdMessage.user_id,
      create_at: createdMessage.created_at,
      user: {
        name: createdMessage.user.name,
        avatar_url: createdMessage.user.avatar_url,
      },
    };

    // Send the new event
    io.emit("new_message", infoWS);

    return createdMessage;
  }
  async getLast3Messages(): Promise<IMessage[]> {
    return await this.messageRepository.getLastThree();
  }
}
