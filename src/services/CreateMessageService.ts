import { PrismaClient } from "@prisma/client"
import prismaClient from "../../prisma"

class CreateMessageService {
  async execut(text: string, user_id: string) {
    const message = prismaClient.message.create({
      data: { text, user_id },
      include: { user: true },
    })
    return message
  }
}

export { CreateMessageService }
