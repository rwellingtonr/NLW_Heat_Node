import { Router } from "express";
import { gitHubLogin, singinCb } from "../modules/gitHub/GitHubController";

const router = Router();

const prefix = "/github";

router.get(prefix, gitHubLogin);
router.get(`${prefix}/signin/auth`, singinCb);

export default router;
