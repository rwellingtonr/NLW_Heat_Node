import { Router } from "express"
import { AuthenticateUserController } from "./controller/AuthenticateUserController"

const router = Router()

//It will work as a middleware
router.post("/authenticate", new AuthenticateUserController().handle)

export { router }
