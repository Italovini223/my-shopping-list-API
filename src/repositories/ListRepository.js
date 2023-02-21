const knex = require('../database/knex');

class ListRepository {
  async createList({title, description, user_id}){
    const list_id = await knex("list").insert({
      title,
      description,
      user_id: Number(user_id)
    });

    return list_id;
  }

  async createProducts(product){
    const productInsert = await knex("products").insert(product);
    return productInsert
  }

  async deleteList(id) {
    await knex("list").where({id}).delete();
  }


  async findListById(id) {
    const list = await knex("list").where({id});
    return list
  }

  async findProductsByListId(id) {
    const products = await knex("products").where({list_id: id});
    return products
  }

  async findListsByUserId({user_id, title}) {
    const lists = await knex("list").where({user_id})
    .whereLike("title",`%${title}%`)
    .orderBy("title");

    return lists;
  }
}

module.exports = ListRepository;