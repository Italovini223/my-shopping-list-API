const UserCreateService =  require('../services/UserCreateService');
const UserDeleteService =  require('../services/UserDeleteService');
const UserRepositoryInMemory  = require('../repositories/UserRepositoryInMemory');

it("should be able to delete a user", async () => {
  const user = {
    name: "teste",
    email: "teste@gmail",
    password: "123"
  }

  const userRepositoryInMemory = new UserRepositoryInMemory();
  const userCreateService = new UserCreateService(userRepositoryInMemory);
  const userCreated = await userCreateService.execute(user);

  const userDeleteService = new UserDeleteService(userRepositoryInMemory);
  const userDeleted = await userDeleteService.execute(userCreated);

  expect(userDeleted).toEqual(undefined)

})
