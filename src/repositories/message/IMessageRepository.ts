import { IMessage } from "../../interface/message";
import { IUser } from "../../interface/user";

export interface IMessageWithUser extends IMessage {
  user: IUser;
}

export interface IMessageRepository {
  create(text: string, userId: string): Promise<IMessageWithUser>;
  getLastThree(): Promise<IMessage[]>;
}
