const Router = require('express');

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const ListControllers = require('../controllers/listControllers')

const listRoutes = Router();

const listControllers = new  ListControllers();

listRoutes.use(ensureAuthenticated);

listRoutes.post("/", listControllers.create);
listRoutes.get("/:id", listControllers.show);
listRoutes.get("/", listControllers.index);
listRoutes.delete("/:id", listControllers.delete);

module.exports = listRoutes;