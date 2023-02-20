const FindUserByNameService =  require('../services/FindUserByNameService');
const UserRepositoryInMemory  = require('../repositories/UserRepositoryInMemory');
const UserCreateService = require('../services/UserCreateService');

it("should be able to find a user by name", async () => {
  const user = {
    name: "teste",
    email: "teste@gmail",
    password: "123"
  }
  
  const userRepositoryInMemory = new UserRepositoryInMemory();
  const userCreateService = new UserCreateService(userRepositoryInMemory);
  await userCreateService.execute(user);

  const user_name = user.name;

  const findUserByNameService = new FindUserByNameService(userRepositoryInMemory);
  const searchedUser = await findUserByNameService.execute(user_name);

  expect(searchedUser.name).toEqual(user_name);
})