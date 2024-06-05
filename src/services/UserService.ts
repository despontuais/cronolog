import { Prisma, User } from "@prisma/client";
import { prisma } from "../libs/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';
import moment from "moment";

export const createUser = async (email: string, password: string, name: string, birthDateString: string) => {

	//email validation
	if (!validator.isEmail(email)) {
		return new Error('E-mail inválido');
	}
	const hasUserEmail: User | null = await findByEmail(email);
	if (hasUserEmail) {
		return new Error('E-mail já cadastrado');
	}

	//username validation
	if (!name || validator.isEmpty(name)) {
		return new Error('Nome de usuario não pode ser nulo');
	}
	const hasUserName: User | null = await prisma.user.findUnique({ where: { username: name } });
	if (hasUserName) {
		return new Error('Nome de usuário já utilizado');
	}

	//birth validation
	if (!birthDateString) {
		return new Error('Data de nascimento não pode ser nula.');
	}
	const dateMomentObject = moment(birthDateString, "DD/MM/YYYY");
	if (!dateMomentObject.isValid()) {
		return new Error('Data de nascimento inválida');
	}
	const birthDate = dateMomentObject.toDate();


	const hash = bcrypt.hashSync(password, 10);
	const user: Prisma.UserCreateInput = {
		email: email,
		password: hash,
		username: name,
		birthDate: birthDate,
	};
	const newUser = await prisma.user.create({ data: user })
	return newUser;
}

export const findByEmail = async (email: string) => {
	return await prisma.user.findUnique({ where: { email } });
}

export const findById = async (id: number) => {
	return await prisma.user.findUnique({ where: { id }, select: { id: true, email: true } });
}

export const findAll = async () => {
	return await prisma.user.findMany({ select: { id: true, email: true } });
}

export const matchPassword = async (passwordText: string, encrypted: string) => {
	return bcrypt.compareSync(passwordText, encrypted);
}
