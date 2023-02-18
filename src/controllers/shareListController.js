const knex = require('../database/knex');

class ShareListController {
  async share(request, response){
    const {user_id, list_id} = request.body;

    await knex("list-shared-with").insert({
      user_id,
      list_id
    })

    return response.status(201).json({
      message: "Lista compartilhada com sucesso"
    })
  }

  async show(request, response){
    const user_id = request.user.id

    const sharedLists = await knex("list-shared-with").select("list_id").where({user_id})

    return response.json(sharedLists)
  }
}

module.exports = ShareListController;