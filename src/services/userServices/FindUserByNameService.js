class FindUserByNameService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(user_name){
    const users = this.userRepository.findUsersByName(user_name);

    if(!users){
      throw new appError('Nenhum usuário foi encontrado com este nome', 404);
    }

    return users;
  }
}

module.exports = FindUserByNameService;