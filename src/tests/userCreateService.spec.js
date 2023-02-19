const UserCreateService =  require('../services/UserCreateService')
const UserRepositoryInMemory  = require('../repositories/UserRepositoryInMemory');

it("should be able to create a new user", async () => {
  const user = {
    name: "teste",
    email: "teste@gmail",
    password: "123"
  }

  const userRepositoryInMemory = new UserRepositoryInMemory();
  const userCreateService = new UserCreateService(userRepositoryInMemory);
  const userCrated = await userCreateService.execute(user);

  expect(userCrated).toHaveProperty("id")
});
