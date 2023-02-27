const Router = require('express');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ShareListController = require('../controllers/shareListController');

const shareListRoutes = Router();

const shareListController = new ShareListController();

shareListRoutes.use(ensureAuthenticated);

shareListRoutes.post('/', shareListController.share);
shareListRoutes.get('/', shareListController.show);

module.exports = shareListRoutes;