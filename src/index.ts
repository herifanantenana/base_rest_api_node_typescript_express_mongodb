import { server, port } from "./api/server";

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});