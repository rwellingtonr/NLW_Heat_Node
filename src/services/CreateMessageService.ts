import { PrismaClient } from "@prisma/client"
import prismaClient from "../../prisma"
import { io } from "../app"
class CreateMessageService {
  async execut(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: { text, user_id },
      include: { user: true },
    })

    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      create_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    }

    // Send the new event
    io.emit("new_message", infoWS)

    return message
  }
}

export { CreateMessageService }
