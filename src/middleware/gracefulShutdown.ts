import prismaClient from "../../prisma";
import { serverHttp } from "../app";
import logger from "../utils/logger";

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

function gracefulShutdown(event: string) {
  return serverHttp.close(() => {
    logger.warn(`Closing session due to ${event}`);
    prismaClient.$disconnect().catch((err) => logger.error(err));
    process.exit(0);
  });
}
