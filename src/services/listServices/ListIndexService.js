class ListIndexService {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async execute({user_id, title}){
    const lists = await this.listRepository.findListsByUserId({user_id, title});
    return lists;
  }
}

module.exports = ListIndexService;