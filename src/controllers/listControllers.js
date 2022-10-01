const knex = require('../database/knex');
const appError = require('../utils/appError')

class ListControllers {
 async create(request, response){
    const {user_id} = request.params

    return response.json("ok");
  }
}

module.exports = ListControllers;