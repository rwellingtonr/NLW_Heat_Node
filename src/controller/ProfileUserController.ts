import { Request, Response } from "express"
import { ProfileUserService } from "../services/ProfileUserService"

class ProfileUserController {
  async handle(req: Request, resp: Response) {
    const { user_id } = req.body

    const service = new ProfileUserService()

    const result = await service.execute(user_id)

    return resp.json(result)
  }
}

export { ProfileUserController }
