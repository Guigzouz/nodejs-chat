import { Application } from "express-ws";
import { WebSocket } from "ws";
import { findUserById } from "../repositories/userRepository";


export function getWsPosts(app: Application, sockets: Map<string, WebSocket>) {
  app.ws("/ws-posts", async (ws, req) => {
    const user = await findUserById(req.signedCookies.ssid);
    if (!user) {
      ws.close();
      return;
    }

    sockets.set(user.id, ws);
    ws.on("message", async (msg: any) => {
      console.log(typeof msg, msg);
      // await createPost(msg, user.id);

      sockets.forEach((socket) => {
        if (socket !== ws)
          socket.send(JSON.stringify({ type: "reply", data: { msg, user } }));
      });
    });

    ws.on("close", () => {
      sockets.delete(user.id);
    });
  });
}