const knex = require("../database/knex");
const appError = require("../utils/appError")
const {hash} = require("bcryptjs");
const sqliteConnection = require("../database/sqlite")

class UserControllers {
 async create(request, response){
    const {name, email, password} = request.body;
    const database = await sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      throw new appError("User already exists");
    } 
    
    const hashedPassword = await hash(password, 8)
      
    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.status(200).json({
      message: "User registered successfully"
    });
  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body;
    const {id} = request.params;

    const user = await knex("users").where({id}).first();
    const checkUserExists = await knex("users").where({email}).first();

    if(checkUserExists && checkUserExists.id !== user.id){
     throw new appError("email is already in use");
    }
    
  }
};

module.exports = UserControllers;