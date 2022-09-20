import MessageRepository from "../../repositories/message/MessageRepository";
import { CreateMessageController } from "./CreateMessageControler";
import { GetLast3MessagesController } from "./GetLast3MessagesController";
import { MessageService } from "./MessageService";

const service = new MessageService(new MessageRepository());

const createMessageController = new CreateMessageController(service);
const getLast3MessagesController = new GetLast3MessagesController(service);

export { createMessageController, getLast3MessagesController };
