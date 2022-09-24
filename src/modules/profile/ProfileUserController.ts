import { Request, Response } from "express";
import { ProfileUserService } from "./ProfileUserService";

// Return the user profile
export class ProfileUserController {
  constructor(private readonly profileUserService: ProfileUserService) {}
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req.body;

      const result = await this.profileUserService.execute(user_id);

      return res.json(result);
    } catch (err) {
      return res.status(404);
    }
  }
}
