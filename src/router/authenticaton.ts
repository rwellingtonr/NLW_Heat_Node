import { Router } from "express";
import controllerAdapter from "../adapter/controller";
import authController from "../../src/modules/authentication/AuthenticationModule";

const authRouter = Router();
const prefix = "/authenticate";

authRouter.post(prefix, controllerAdapter(authController));

export default authRouter;
