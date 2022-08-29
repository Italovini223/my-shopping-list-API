const knex = require("../database/knex");
const appError = require("../utils/appError")
const {hash} = require("bcryptjs");
class UserControllers {
 async create(request, response){
    const {name, email, password} = request.body;
    
    const checkUserExists = await knex("users").where({email});
    if(checkUserExists){
      throw new appError("User already exists")
    } else {
      const hashedPassword = await hash(password, 8)
      
      await knex("users").insert({
        name,
        email,
        password: hashedPassword
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