import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController {
  async handle(req: Request, resp: Response) {
    // instancing the service
    const service = new AuthenticateUserService()
    // service.execute()
  }
}

export { AuthenticateUserController }
