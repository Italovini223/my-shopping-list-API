class ListDeleteService {
  constructor(listRepository){
    this.listRepository = listRepository;
  }
  async execute(id){
    await this.listRepository.deleteList(id);
  }
}

module.exports = ListDeleteService;