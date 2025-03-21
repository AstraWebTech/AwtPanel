<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const terminalRef = ref(null);
const ws = ref(null);
let term, fitAddon;

const props = defineProps({
  host: String,
  port: {type: Number, default: 22},
  username: String,
  password: String,
});

const connectSSH = () => {
  ws.value = new WebSocket("ws://localhost:8080");

  ws.value.onopen = () => {
    ws.value.send(JSON.stringify({
      action: "connect",
      data: {host: props.host, port: props.port, username: props.username, password: props.password}
    }));
  };

  ws.value.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.action === "output") term.write(msg.data);
    term.scrollToBottom();
  };

  ws.value.onclose = () => {
    term.write("\r\nConnection closed");
    term.scrollToBottom();
  };

  ws.value.onerror = (error) => {
    console.error("WebSocket Error:", error);
    term.scrollToBottom();
  };
};

const disconnectSSH = () => {
  if (ws.value) {
    ws.value.send(JSON.stringify({action: "disconnect"}));
    ws.value.close();
  }
};

onMounted(() => {
  term = new Terminal({
    cursorBlink: true,
    fontSize: 12,
    fontFamily: 'Monospace, "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Courier New"',
    theme: {
      background: "#242933",
      foreground: "#ffffff",
      cursor: "#ffffff",
      selection: "#4f5b66",
      black: "#242933",
      red: "#ec5f67",
      green: "#99c794",
      yellow: "#fac863",
      blue: "#6699cc",
      magenta: "#c594c5",
      cyan: "#5fb3b3",
      white: "#d8dee9",
      brightBlack: "#65737e",
      brightRed: "#ec5f67",
      brightGreen: "#99c794",
      brightYellow: "#fac863",
      brightBlue: "#6699cc",
      brightMagenta: "#c594c5",
      brightCyan: "#5fb3b3",
      brightWhite: "#ffffff",
    },
    allowTransparency: true,
    scrollback: 1000,
    disableStdin: false,
    scrollSensitivity: 1,
    cols: 120,
    rows: 40,
    mouseEvents: true,
  });

  fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(terminalRef.value);
  fitAddon.fit();

  term.onData((data) => {
    ws.value?.send(JSON.stringify({action: "input", data}));
    term.scrollToBottom();
  });

  connectSSH();
});

onUnmounted(() => {
  disconnectSSH();
});
</script>

<template>
  <div class="ssh-terminal">
    <div class="toolbar">
      <span>SSH to {{ host }}</span>
      <div class="tools">
        <button @click="disconnectSSH">Disconnect</button>
        <button @click="connectSSH">Connect</button>
      </div>
    </div>
    <div ref="terminalRef" class="terminal-container"></div>
  </div>
</template>

<style scoped>
.ssh-terminal {
  border: 1px solid #3c3f4a;
  background: #242933;
  padding: 8px;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.terminal-container {
  width: 100%;
  height: 400px;
  border-radius: 4px;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: linear-gradient(to bottom, #2b313b, #242933);
  color: white;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
}

button {
  background: #3b4252;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background: #4c566a;
}
</style>
