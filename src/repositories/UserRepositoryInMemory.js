
class UserRepositoryInMemory {
  users = [];

  async createUser({name, email,password}){
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password
    }

    this.users.push(user);

    return user;
  }

  async updateUser({name, email, password, id}){
    const filteredUser = this.users.filter(user => user.id !== id);
    this.users = filteredUser

    const user = {
      id,
      name,
      email,
      password
    }

    this.users.push(user);
    return user;
  }

  async deleteUser(id){
    const filteredUsers = this.users.filter(user => user.id !== id);
    this.users = filteredUsers
  }

  async findByEmail(email){
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findUserById(id){
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async findUsersByName(user_name){
    const users = this.users.find(user => user.name === user_name);
    return users;
  }

}

module.exports = UserRepositoryInMemory;