import { IMessage } from "../../interface/message";

export interface IMessageService {
  getLast3Messages(): Promise<IMessage[]>;
  create(message: string, userId: string): Promise<IMessage>;
}
