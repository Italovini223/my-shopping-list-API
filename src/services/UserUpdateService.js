const {hash, compare} = require('crypto')
const appError = require('../utils/appError')

class UserUpdateService {
  constructor(userRepository){
    this.userRepository = userRepository;
  }

  async execute({name, email, password, old_password, id}){
    const user = await this.userRepository.findUserById(id);

    if(email){
      const checkUserExists = await this.userRepository.findByEmail(email)
      if(checkUserExists && checkUserExists.id !== user.id){
        throw new appError("email is already in use");
      } 
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

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;

    const userUpdated = await this.userRepository.updateUser({
      id,
      name: user.name,
      email: user.email,
      password: user.password
    })

    return userUpdated

  }
}

module.exports = UserUpdateService;