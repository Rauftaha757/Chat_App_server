const express = require("express");
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("./public/temp"))
// routes
const authrouter=require('./routes/user.routes.js')
app.use("/api",authrouter)
module.exports = app;
