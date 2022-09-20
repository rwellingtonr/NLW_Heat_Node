import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import controllerAdapter from "../adapter/controller";
import profileController from "../modules/profile/ProfileUserModule";

const router = Router();

router.get("/profile", ensureAuthenticated, controllerAdapter(profileController));

export default router;
