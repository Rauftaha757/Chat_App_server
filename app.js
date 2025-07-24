const express = require("express");
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("./public/temp"))
// routes
const authrouter=require('./routes/user.routes.js');
const errorMiddleware = require("./utils/errorhandling.js");
app.use("/api",authrouter);
 app.use(errorMiddleware);
module.exports = app;
