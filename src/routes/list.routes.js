const Router = require('express');

const ListControllers = require('../controllers/listControllers')

const listRoutes = Router();

const listControllers = new  ListControllers();

listRoutes.post("/:user_id", listControllers.create);
listRoutes.get("/:id", listControllers.show);

module.exports = listRoutes;