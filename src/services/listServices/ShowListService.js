class ShowListService {
  constructor(listRepository){
    this.listRepository = listRepository;
  }

  async execute(id) {
    const list = await this.listRepository.findListById(id);
    const products = await this.listRepository.findProductsByListId(id)

    return {
      ...list,
      products
    }
  }
}

module.exports = ShowListService;