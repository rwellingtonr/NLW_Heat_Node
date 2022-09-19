import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const messageRouter = Router();
// added middleware to ensure the authentication
messageRouter.post("/messages", ensureAuthenticated, new CreateMessageController().handle);
/* GET METHOD */
messageRouter.get("/messages/last3", new GetLast3MessagesController().handle);

export default messageRouter;
