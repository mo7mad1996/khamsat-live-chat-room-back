import { Server } from "socket.io";

import controller from "./controller.js";

export default (server) => {
  const io = new Server(server, { cors: "*" });

  io.on("connect", (socket) => {
    // Attach event listeners to the socket
    const events = controller(socket, io);

    for (const key in events) socket.on(key, events[key]);
  });
};
