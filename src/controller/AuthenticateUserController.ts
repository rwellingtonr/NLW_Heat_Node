import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController {
  async handle(req: Request, resp: Response) {
    // Grab the code from the body
    const { code } = req.body

    // instancing the Service Authenticator
    const service = new AuthenticateUserService()
    try {
      // Run it
      const result = await service.execute(code)

      return resp.json(result)
    } catch (e) {
      return resp.json({ error: e.message })
    }
  }
}

export { AuthenticateUserController }
