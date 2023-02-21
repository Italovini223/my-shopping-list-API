const UserRepository = require('../repositories/UserRepository');

const UserCreateService = require('../services/userServices/UserCreateService');
const UserUpdateService = require('../services/userServices/UserUpdateService');
const UserDeleteService = require('../services/userServices/UserDeleteService');
const FindUserByNameService = require('../services/userServices/FindUserByNameService');



const userRepository = new UserRepository();

class UserControllers {
 async create(request, response){
    const {name, email, password} = request.body;

    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({name, email, password});
   
    return response.status(200).json({
      message: "User registered successfully"
    });
  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const userUpdateService = new UserUpdateService(userRepository);
    await userUpdateService.execute({
      name,
      email,
      password,
      old_password,
      id: user_id
    })

   return response.json({
    message: "user information updated successfully"
   });
  }

  async delete(request, response) {
    const {id} = request.user;

   const userDeleteService = new UserDeleteService(userRepository);
   await userDeleteService.execute(id)

    return response.json({
      message: "User deleted successfully"
    })
  }

  async search(request, response) {
    const {user_name} = request.params;

    const findUserByNameService = new FindUserByNameService(userRepository);
    const users = await findUserByNameService.execute(user_name);

    return response.json(users);
  }
};

module.exports = UserControllers;