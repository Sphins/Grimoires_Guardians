// start/socket.js
const { Server } = require("socket.io");

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*", // Autoriser toutes les origines
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });

        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
        });
    });
};

module.exports = { initializeSocket };
