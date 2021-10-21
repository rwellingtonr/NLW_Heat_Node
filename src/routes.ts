import { Router } from "express"
import { AuthenticateUserController } from "./controller/AuthenticateUserController"
import { CreateMessageController } from "./controller/CreateMessageControler"
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

export { router }
