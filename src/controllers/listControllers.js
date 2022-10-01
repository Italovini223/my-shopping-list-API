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
    const {user_id} = request.params;
    const {title, products} = request.query;

    let lists;

    if(products) {
      const filteredProducts = products.split(",").map(product => product.trim());

      lists = await knex("products")
      .select([
        "list.id",
        "list.title",
        "products.name",
        "list.user_id"
      ])
      .where("list.user_id", user_id)
      .whereLike("list.title", `%${title}%`)
      .whereIn("products.name", filteredProducts)
      .innerJoin("list", "list.id", "products.list_id")
    } else {
      
      lists = await knex("list").where({user_id})
      .whereLike("title",`%${title}%`)
      .orderBy("title");
    }


    return response.json(lists);
  }

  
}

module.exports = ListControllers;