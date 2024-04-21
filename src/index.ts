import { server, port } from "./api/server";
import { connectToMongoDB } from "./core/database";

connectToMongoDB();

server.listen(port);