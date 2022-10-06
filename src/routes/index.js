const {Router} = require("express");

const routes = Router();

const userRoutes = require("./user.routes");
const listRoutes = require("./list.routes");
const sessionsRoutes = require("./sessions.routes");

routes.use("/users", userRoutes);
routes.use("/list", listRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;