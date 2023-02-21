const UserCreateService =  require('../../services/userServices/UserCreateService');
const UserRepositoryInMemory  = require('../../repositories/UserRepositoryInMemory');
const appError = require('../../utils/appError');

describe("user create service", () => {
  let userRepositoryInMemory;
  let userCreateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  })



  it("should be able to create a new user", async () => {
    const user = {
      name: "teste",
      email: "teste@gmail",
      password: "123"
    }
  
  
    const userCrated = await userCreateService.execute(user);
  
    expect(userCrated).toHaveProperty("id")
  });
  
  it("should not be able to create a new user with an existing email", async () => {
    const user1 = {
      name: "user test 1",
      email: "teste@gmail.com",
      password: "test123"
    }

    const user2 = {
      name: "user test 2",
      email: "teste@gmail.com",
      password: "test123"
    }

    await userCreateService.execute(user1);

    expect(async () => {
      await userCreateService.execute(user2)
    }).rejects.toEqual(new appError("User already exists"))
  })
})

