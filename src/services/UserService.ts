import { Prisma, User } from "@prisma/client";
import { prisma } from "../libs/prisma";
import bcrypt from "bcrypt";
import validator from "validator";
import moment from "moment";
import { generateToken } from "../config/passport";

//this type is being declared in "auth.ts" and "UserService.ts"
interface UserLoginInput {
  email?: string;
  username?: string;
  password: string;
}

export const createUser = async (userBody: Prisma.UserCreateInput) => {
  //email validation
  if (!validator.isEmail(userBody.email)) {
    throw new Error("E-mail inválido");
  }

  //transform into function "isEmailTaken"
  const hasUserEmail: User | null = await findByEmail(userBody.email);
  if (hasUserEmail) {
    throw new Error("E-mail já cadastrado");
  }
  //username validation
  if (!userBody.username || validator.isEmpty(userBody.username)) {
    throw new Error("Nome de usuario não pode ser nulo");
  }

  //transform into function "isUsernameTaken"
  const hasUserName: User | null = await prisma.user.findUnique({
    where: { username: userBody.username },
  });
  if (hasUserName) {
    throw new Error("Nome de usuário já utilizado");
  }

  //birth validation
  if (!userBody.birthDate) {
    throw new Error("Data de nascimento não pode ser nula.");
  }
  const dateMomentObject = moment(userBody.birthDate, "DD/MM/YYYY");
  if (!dateMomentObject.isValid()) {
    throw new Error("Data de nascimento inválida");
  }
  const birthDate = dateMomentObject.toDate();

  const hash = bcrypt.hashSync(userBody.password, 10);
  const user: Prisma.UserCreateInput = {
    email: userBody.email,
    password: hash,
    username: userBody.username,
    birthDate: birthDate,
  };
  const newUser = await prisma.user.create({ data: user });
  return newUser;
};
export const loginUser = async (userParams: UserLoginInput) => {
  const user = userParams.email
    ? await findByEmail(userParams.email)
    : userParams.username
      ? await findByName(userParams.username)
      : null;

  //refactor later
  if (typeof userParams.password === "undefined") {
    userParams.password = "";
  }

  if (user && matchPassword(userParams.password.toString(), user.password)) {
    const token = generateToken({ id: user.id });
    return JSON.stringify({
      status: true,
      token,
    });
  }
  return JSON.stringify({
    status: false,
    error: "Login e/ou senha inválidos.",
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const findByName = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const findById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true },
  });
};

export const findAll = async () => {
  return await prisma.user.findMany({ select: { id: true, email: true } });
};

export const matchPassword = (passwordText: string, encrypted: string) => {
  return bcrypt.compareSync(passwordText, encrypted);
};
