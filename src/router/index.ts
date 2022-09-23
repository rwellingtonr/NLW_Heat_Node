import { Router } from "express";
import { readdir } from "fs/promises";
import logger from "../utils/logger";
const router = Router();

runRouter().catch((e) => logger.error(e));

async function runRouter() {
  const filesToImport = (await readdir(__dirname)).filter((file) => !file.includes("index"));
  for (const fileToImport of filesToImport) {
    const file = await import(`./${fileToImport}`);
    router.use(file.default);
  }
}

export default router;
