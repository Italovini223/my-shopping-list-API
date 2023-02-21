
const ListRepository = require('../repositories/ListRepository');

const ListCreateService = require('../services/listServices/ListCreateService');
const ShowListService = require('../services/listServices/ShowListService');
const ListIndexService = require('../services/listServices/ListIndexService');
const ListDeleteService = require('../services/listServices/ListDeleteService')

const listRepository = new ListRepository();

class ListControllers {
 async create(request, response){
    const user_id = request.user.id
    const {title, description, products} = request.body;

    const listCreateService = new ListCreateService(listRepository);
    await listCreateService.execute({title, description, products, user_id});

    return response.status(201).json("lista criada com sucesso");
  }

  async show(request, response){
    const {id} = request.params;

   const showListService = new ShowListService(listRepository);
   const list = await  showListService.execute(id);


   return response.json(list[0].title);
  
  }

  async index(request, response) {
    const user_id = request.user.id;
    const {title} = request.query;


    const listIndexService = new ListIndexService(listRepository);
    const lists = await listIndexService.execute({user_id, title})
      
    return response.json(lists)
  }

  async delete(request, response){
    const{id} = request.params;

    const listDeleteService = new ListDeleteService(listRepository);
    await listDeleteService.execute(id);

    return response.json("lista deletada com sucesso!");
  }
}

module.exports = ListControllers;