class ListRepositoryInMemory {
  lists = [];
  products = [];

  async createList({title, description, user_id}){
    const list = {
      id: Math.floor(Math.random() * 1000) + 1,
      user_id,
      title,
      description
    }

    const listInsert  =  this.lists.push(list);
    return listInsert.id
  }

  async createProducts(product){
    const productInsert = this.products.push(product);
    return productInsert;
  }
}

module.exports = ListRepositoryInMemory;