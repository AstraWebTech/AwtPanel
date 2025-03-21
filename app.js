require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const apiRoutes = require("./routes/api/index");
const generateRoutes = require("./routes/generate-routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);

app.get(generateRoutes, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

require("./ssh/ssh-server");

module.exports = app;