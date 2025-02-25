import { prismaClient } from "db/client";

Bun.serve({
    port: 8081,
    fetch(req, server) {
        if (server.upgrade(req)) {
            return;
        }
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        message(ws, message) {
            prismaClient.user.create({
                data: {
                    username: Math.random().toString(36).substring(2, 9),
                    password: Math.random().toString(36).substring(2, 9),
                }
            })
            ws.send(message);
        },
    },
});