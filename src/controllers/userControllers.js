const knex = require("../database/knex");
const appError = require("../utils/appError")
class UserControllers {
 async create(request, response){
    const {name, email, password} = request.body;
    
    const checkUserExists = await knex("users").where({email});

    if(checkUserExists){
      throw new appError("User already exists")
    } else {
      await knex("users").insert({
        name,
        email,
        password
      });
    }

    return response.status(200).json({
      message: "User registered successfully"
    });
  }

  async update(request, response) {
    
  }
};

module.exports = UserControllers;