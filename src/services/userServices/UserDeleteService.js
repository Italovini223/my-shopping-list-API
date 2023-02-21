class UserDeleteService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id) {
    await this.userRepository.deleteUser(id)
  }
}

module.exports = UserDeleteService;