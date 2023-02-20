const knex = require('../database/knex');

class UserRepository {
  async findByEmail(email){
    const user = await knex("users").where({email}).first()
    return user
  }

  async findUserById(id){
    const user = await knex("users").where({id}).first();
    return user;
  }

  async findUsersByName(user_name){
    const users = await knex("users").whereLike('name', `%${user_name}%`);
    return users;
  }

  async createUser({name, email, password}){
      
    const userId = await knex("users").insert({
      name,
      email,
      password
    });

    return {id: userId}
  }


  async updateUser({name, email, password, id}) {
    const user = await knex("users").where({id}).update({
      name,
      email,
      password,
      updated_at: String(new Date())
    });

    return user;
  }


  async deleteUser(id){
    await knex("users").where({id}).delete()
  }
  

}

module.exports = UserRepository;