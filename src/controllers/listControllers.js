const knex = require('../database/knex');
const appError = require('../utils/appError')

class ListControllers {
 async create(request, response){
    const user_id = request.user.id
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
        name: product.name,
        quantity: product.quantity,
        value: product.value
      }
    });

    await knex("products").insert(productsInsert);

    return response.status(201).json("lista criada com sucesso");

  }

  async show(request, response){
    const {id} = request.params;

    const list = await knex("list").where({id});
    const products = await knex("products").where({list_id: id});

    return response.json({
      ...list,
      products
    })
  }

  async index(request, response) {
    const user_id = request.user.id;
    const {title} = request.query;

    const lists = await knex("list").where({user_id})
    .whereLike("title",`%${title}%`)
    .orderBy("title");

      
    return response.json(lists)
  }

  async delete(request, response){
    const{id} = request.params;

    await knex("list").where({id}).delete();

    return response.json("lista deletada com sucesso!");
  }
}

module.exports = ListControllers;