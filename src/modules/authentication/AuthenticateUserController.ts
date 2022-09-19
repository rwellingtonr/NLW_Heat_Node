import { Request, Response } from "express";
import { AuthenticateUserService } from "./AuthenticateUserService";

export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}
  async handle(req: Request, res: Response) {
    // Grab the code from the body
    const { code } = req.body;

    // instancing the Service Authenticator
    try {
      // Run it
      const result = await this.authenticateUserService.execute(code);

      return res.json(result);
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
