const knex = require('../database/knex');
const appError = require('../utils/appError')

class ListControllers {
 async create(request, response){
    const {user_id} = request.params;
    const {title, description, products} = request.body;

    const list_id = await knex("list").insert({
    title,
    description,
    user_id: Number(user_id)
    });

    const productsInsert = products.map(product => {
      return {
        user_id,
        list_id,
        name: product
      }
    });

    await knex("products").insert(productsInsert);

    return response.status(201).json("lista criada com sucesso");


  }
}

module.exports = ListControllers;