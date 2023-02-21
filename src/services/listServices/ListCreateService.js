class ListCreateService {
  constructor(listRepository){
    this.listRepository = listRepository;
  }

  async execute({title, description, products, user_id}){
    const list_id = await this.listRepository.createList({title,description, user_id});

    const product = products.map(product => {
      return {
        user_id,
        list_id,
        name: product.name,
        quantity: product.quantity,
        value: product.value
      }
    });

    const productInsert = await this.listRepository.createProducts(product)
    return productInsert;
  }
}

module.exports = ListCreateService;