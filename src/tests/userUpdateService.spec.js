const appError = require('../utils/appError');

const UserCreateService =  require('../services/UserCreateService');
const UserUpdateService =  require('../services/UserUpdateService');
const UserRepositoryInMemory  = require('../repositories/UserRepositoryInMemory');

describe("test update user service", () => {
  let userRepositoryInMemory;
  let userCreateService;
  let userUpdateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
    userUpdateService = new UserUpdateService(userRepositoryInMemory);
  })
  
  it("should be able to update a user", async () => {
    const user = {
      name: "john Doe",
      email: "johnDoe@gmail",
      password: "123"
    }
  

    const userCrated = await userCreateService.execute(user);
  
    const newUser = {
      id: userCrated.id,
      name: "John Doe updated",
    }
  
    
    const userUpdate = await userUpdateService.execute(newUser);
  
    expect(userUpdate.name).toEqual("John Doe updated");
  
  })

  it("should not be able to update a user email with a exiting email" , async () => {
    const user1 = {
      name: "user test 1",
      email: "teste@gmail.com",
      password: "test123"
    }

    const user2 = {
      name: "user test 2",
      email: "teste2@gmail.com",
      password: "test123"
    }


    await userCreateService.execute(user1);
    const user = await userCreateService.execute(user2);

    const userUpdated = {
      id: user.id,
      email: user1.email,
    }

    expect(async () => {
      await userUpdateService.execute(userUpdated)
    }).rejects.toEqual(new appError("email is already in use", 401))

  })

  it("should not be able to update the password without pass the old password", async () => {
    const user = {
      name: "user test 1",
      email: "teste@gmail.com",
      password: "test123"
    }

    await userCreateService.execute(user);

    const userUpdated = {
      password: "updated123"
    }

    expect(async () => {
      await userUpdateService.execute(userUpdated)
    }).rejects.toEqual(new appError("please entry your old password"))
  })

  it("should note be able to update the password whit the old password incorrect", async () => {
    const user = {
      name: "user test 1",
      email: "teste@gmail.com",
      password: "test123"
    }

    const userCreated = await userCreateService.execute(user);

    const userUpdated = {
      id: userCreated.id,
      old_password: "123",
      password: "updated123"
    }

    expect(async () => {
      await userUpdateService.execute(userUpdated)
    }).rejects.toEqual(new appError("old password is incorrect", 401))
  })
})
