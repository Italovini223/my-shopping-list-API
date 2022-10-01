const {Router} = require("express");

const routes = Router();

const userRoutes = require("./user.routes");
const listRoutes = require("./list.routes");

routes.use("/users", userRoutes);
routes.use("/list", listRoutes);

module.exports = routes;