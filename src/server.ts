import { serverHttp } from "./app";
import logger from "./utils/logger";

const { PORT } = process.env;

serverHttp.listen(PORT, () => logger.info(`Running on port: ${PORT}`));
