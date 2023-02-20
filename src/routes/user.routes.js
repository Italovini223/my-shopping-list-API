const Router = require("express");
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const UserControllers = require("../controllers/userControllers");

const userRoutes = Router();

const userControllers = new UserControllers();


userRoutes.post("/", userControllers.create);
userRoutes.put("/", ensureAuthenticated, userControllers.update);
userRoutes.delete("/", ensureAuthenticated, userControllers.delete);
userRoutes.get("/:user_name", ensureAuthenticated, userControllers.search);

module.exports = userRoutes;