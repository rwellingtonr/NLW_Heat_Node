import { Router } from "express";
import {
  createMessageController,
  getLast3MessagesController,
} from "../modules/messages/MessageModule";
import controllerAdapter from "../adapter/controller";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const messageRouter = Router();
// added middleware to ensure the authentication
messageRouter.post("/messages", ensureAuthenticated, controllerAdapter(createMessageController));
/* GET METHOD */
messageRouter.get("/messages/last3", controllerAdapter(getLast3MessagesController));

export default messageRouter;
