import { prisma } from "../libs/prisma";
import * as UserService from "./UserService";

describe("Testing user service", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  const userTest = {
    username: "test",
    email: "test@test.com",
    password: "2030",
    birthDate: "05/02/2000",
  };

  const userTest2 = {
    username: "",
    email: "anothertest@test.com",
    password: "4050",
    birthDate: "10/08/2002",
  };

  it("should create a new user (with a name)", async () => {
    const newUser = await UserService.createUser(userTest);
    expect(newUser).not.toBeInstanceOf(Error);
    expect(newUser.email).toBe(userTest.email);
    expect(newUser.username).toBe(userTest.email);
  });

  it("should not create a new user without a name", async () => {
    const newUser = await UserService.createUser(userTest2);
    expect(newUser).toBeInstanceOf(Error);
  });

  it("should not allow to create a user with existing email", async () => {
    const newUser = await UserService.createUser(userTest);
    expect(newUser).toBeInstanceOf(Error);
  });

  it("should find a user by the email", async () => {
    const user = await UserService.findByEmail(userTest.email);
    user && expect(user.email).toBe(userTest.email);
  });

  it("should match the password from database", async () => {
    const user = await UserService.findByEmail(userTest.email);
    user && UserService.matchPassword(userTest.password, user.password);
    let match = false;
    if (user) {
      match = UserService.matchPassword(userTest.password, user.password);
    }
    expect(match).toBeTruthy();
  });

  it("should not match the password from database", async () => {
    const user = await UserService.findByEmail(userTest.email);
    let match = true;
    if (user) {
      match = UserService.matchPassword("anything", user.password);
    }
    expect(match).toBeFalsy();
  });
});
