// Importing the Liberys
import "dotenv/config";
import "express-async-errors";
import express from "express";
import http from "http";
import morgan from "morgan";
import errorHandling from "./middleware/errorHandling";
import cors from "cors";
import router from "./router";
import { Server } from "socket.io";
import logger from "./utils/logger";

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
io.on("connection", (socket) => {
  logger.log(`User connected on socket ${socket.id}`);
});

app.get("/github", (req, res) => {
  // Redirect the user to asking for authorisation on github
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (req, res) => {
  // Axis code
  const { code } = req.query;
  return res.json(code);
});

export { serverHttp, io };
