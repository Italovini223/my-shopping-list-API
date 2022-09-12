const knex = require("../database/knex");
const appError = require("../utils/appError")
const {hash, compare} = require("bcryptjs");
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

    const database = await sqliteConnection();

    const user = await knex("users").where({id}).first();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists && checkUserExists.id !== user.id){
     throw new appError("email is already in use");
    } 

    if(password && !old_password) {
      throw new appError("please entry your old password");
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new appError("old password is incorrect");
      }

      user.password = await hash(password, 8);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;


   await knex("users").where({id}).update({
    name: user.name,
    email: user.email,
    password: user.password
   });

   return response.json({
    message: "user information updated successfully"
   });
  }

  async delete(request, response) {
    const {id} = request.params;

    await knex("users").where({id}).delete()

    return response.json({
      message: "User deleted successfully"
    })
  }
};

module.exports = UserControllers;