import http from "http"
import app from "./app"
import dotenv from "dotenv"

dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT || 3000;
const address = server.address();
const bind = typeof address === "string" ? `Pipe ${address}` : `Port ${port}`;

const errorHandler = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      console.error(` 🚨 ${bind} requires elevated privileges ❌`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(` 🚨 ${bind} is already in use ❌`);
      process.exit(1);
    default:
      throw error;
  }
}

const onListening = (): void => {
  console.log(` 🚀 Listening on ${bind} ✅`);
}

server.on("error", errorHandler);
server.on("listening", onListening);

export {
  server,
  port
}