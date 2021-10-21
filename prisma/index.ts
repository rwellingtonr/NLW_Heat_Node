import { PrismaClient } from "@prisma/client"

// it'll connect with the database

const prismaClient = new PrismaClient()

export default prismaClient
