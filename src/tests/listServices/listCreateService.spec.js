const UserCreateService =  require('../../services/userServices/UserCreateService');
const UserRepositoryInMemory  = require('../../repositories/UserRepositoryInMemory');

const ListCreateService= require('../../services/listServices/ListCreateService');
const ListRepositoryInMemory = require('../../repositories/ListRepositoryInMemory');

describe("test create list service", () => {
  let listCreateService;
  let userCreateService;
  let userRepository
  let listRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepository)

    listRepository = new ListRepositoryInMemory();
    listCreateService = new ListCreateService(listRepository);

  })

  it("should be able to create a new list", async () => {
    const user = {
      name: "teste",
      email: "teste@gmail",
      password: "123"
    }

    await userCreateService.execute(user)

    const list = {
      user_id: user.id,
      title: "lista de compras de abril",
      description: "fazer a compra no novo abc",
      products: [
        {
          name: "danix",
          quantity: 1,
          value: 1.95
        },
        {
          name: "coca cola",
          quantity: 1,
          value: 7.90
        },
        {
          name: "salsicha",
          quantity: 1,
          value: 10.00
        }
      ]
    }

    const listCreated = await listCreateService.execute(list)

    expect(listCreated).toEqual(1)
  })
})

