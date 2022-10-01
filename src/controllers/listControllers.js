const knex = require('../database/knex');
const appError = require('../utils/appError')

class ListControllers {
 async create(request, response){
    const {user_id} = request.params;
    const {title, description, products} = request.body;


  }
}

module.exports = ListControllers;