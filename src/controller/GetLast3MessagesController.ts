import { Request, Response } from "express"
import { GetLast3Messages } from "../services/GetLast3Messages"

class GetLast3MessagesController {
  async handle(req: Request, resp: Response) {
    const service = new GetLast3Messages()
    const result = await service.execute()

    return resp.json(result)
  }
}

export { GetLast3MessagesController }
