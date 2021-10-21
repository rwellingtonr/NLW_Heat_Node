import { Router } from "express"
import { AuthenticateUserController } from "./controller/AuthenticateUserController"
import { CreateMessageController } from "./controller/CreateMessageControler"
import { GetLast3MessagesController } from "./controller/GetLast3MessagesController"
import { ProfileUserController } from "./controller/ProfileUserController"
import ensureAuthenticated from "./middleware/ensureAuthenticated"

const router = Router()

/* POST METHOD */
//It will work as a middleware
router.post("/authenticate", new AuthenticateUserController().handle)

// added middleware to ensure the authentication
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
)
/* GET METHOD */
router.get("/messages/last3", new GetLast3MessagesController().handle)

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle)

export { router }
