const knex = require("../database/knex");
const appError = require("../utils/appError")
class UserControllers {
 async create(request, response){
    const {name, email, password} = request.body;
    
    const checkUserExists = await knex("users").where({email});

    if(checkUserExists){
      throw new appError("User already exists");
    }
    
    await knex("users").insert({
      name,
      email,
      password
    });
  }
};

module.exports = UserControllers;