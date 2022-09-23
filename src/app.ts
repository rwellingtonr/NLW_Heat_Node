import "dotenv/config";
import "express-async-errors";
import "./middleware/gracefulShutdown";
import express from "express";
import http from "http";
import morgan from "morgan";
import errorHandling from "./middleware/errorHandling";
import cors from "cors";
import logger from "./utils/logger";
import router from "./router";
import { Server, Socket } from "socket.io";

// Create app express
const app = express();
// allows the connection between front and back-end
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandling);
app.use(router);

// Create a server Http
const serverHttp = http.createServer(app);

// Create the IO
// The second parameter allows multi plataform (mobile and web)
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});
// Event listener
io.on("connection", (socket: Socket) => {
  logger.log(`User connected on socket ${socket.id}`);
});

export { serverHttp, io };
