const {Router} = require("express");

const routes = Router();

const userRoutes = require("./user.routes");
const listRoutes = require("./list.routes");
const sessionsRoutes = require("./sessions.routes");
const shareListRoutes = require('./shareList.routes');

routes.use("/users", userRoutes);
routes.use("/list", listRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/share", shareListRoutes)

module.exports = routes;