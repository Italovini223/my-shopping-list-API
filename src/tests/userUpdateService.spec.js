const UserCreateService =  require('../services/UserCreateService');
const UserUpdateService =  require('../services/UserUpdateService');
const UserRepositoryInMemory  = require('../repositories/UserRepositoryInMemory');


it("should be able to update a user", async () => {
  const user = {
    name: "john Doe",
    email: "johnDoe@gmail",
    password: "123"
  }

  const userRepositoryInMemory = new UserRepositoryInMemory();
  const userCreateService = new UserCreateService(userRepositoryInMemory);
  const userCrated = await userCreateService.execute(user);

  const newUser = {
    id: userCrated.id,
    name: "John Doe updated",
  }

  const userUpdateService = new UserUpdateService(userRepositoryInMemory);
  const userUpdate = await userUpdateService.execute(newUser);

  expect(userUpdate.name).toEqual("John Doe updated");

})