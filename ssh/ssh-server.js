const WebSocket = require("ws");
const { Client } = require("ssh2");

const wss = new WebSocket.Server({ port: 8080 });

console.log("✅  WebSocket SSH server \"ws://localhost:8080\"");

wss.on("connection", (ws) => {
    let sshClient = new Client();
    let sshStream = null;

    ws.on("message", (message) => {
        try {
            const { action, data } = JSON.parse(message);

            if (action === "connect") {
                const { host, port, username, password } = data;

                sshClient.on("ready", () => {
                    ws.send(JSON.stringify({ action: "status", data: "Connected to SSH" }));

                    sshClient.shell((err, stream) => {
                        if (err) {
                            ws.send(JSON.stringify({ action: "error", data: err.message }));
                            return;
                        }

                        sshStream = stream;
                        sshStream.on("data", (chunk) => {
                            ws.send(JSON.stringify({ action: "output", data: chunk.toString() }));
                        });

                        sshStream.on("close", () => {
                            ws.send(JSON.stringify({ action: "status", data: "SSH session closed" }));
                            sshClient.end();
                        });
                    });
                });

                sshClient.on("error", (err) => {
                    ws.send(JSON.stringify({ action: "error", data: err.message }));
                });

                sshClient.connect({ host, port, username, password });
            }

            if (action === "input" && sshStream) {
                sshStream.write(data);
            }

            if (action === "disconnect") {
                sshClient.end();
                ws.close();
            }
        } catch (error) {
            console.error("Invalid message format:", error);
        }
    });

    ws.on("close", () => {
        sshClient.end();
    });
});

module.exports = wss;
