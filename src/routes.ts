import { Router } from "express"
import { AuthenticateUserController } from "./controller/AuthenticateUserController"
import { CreateMessageController } from "./controller/CreateMessageControler"
import { GetLast3MessagesController } from "./controller/GetLast3MessagesController"
import ensureAuthenticated from "./middleware/ensureAuthenticated"

const router = Router()

//It will work as a middleware
router.post("/authenticate", new AuthenticateUserController().handle)

// added middleware to ensure the authentication
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
)

router.get("/messages/last3", new GetLast3MessagesController().handle)

export { router }
