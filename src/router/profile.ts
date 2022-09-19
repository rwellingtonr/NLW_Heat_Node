import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const router = Router();

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export default router;
