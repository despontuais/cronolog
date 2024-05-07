import { Prisma, User } from "@prisma/client";
import { prisma } from "../libs/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';

export const createUser = async (email: string, password: string, name: string) =>{
    if(!validator.isEmail(email)){
        return new Error('E-mail inválido');
    }
    if(!name || validator.isEmpty(name)){
        return new Error('Nome de usuário vazio');
    }
    const hasUserEmail: User | null = await prisma.user.findUnique({where: {email}});
    const hasUserName: User | null = await prisma.user.findUnique({where: {name}});
    if(hasUserEmail){
        return new Error('E-mail já cadastrado');
    }
    if(hasUserName){
        return new Error('Nome de usuário já utilizado');
    }
    const hash = bcrypt.hashSync(password, 10);
    const user: Prisma.UserCreateInput = {
        email,
        password: hash,
        name
    };
    const newUser = await prisma.user.create({data: user})
    return newUser;
}

export const findByEmail = async (email: string) => {
    return await prisma.user.findUnique({where: {email}});
}

export const findById = async (id: number) => {
    return await prisma.user.findUnique({where: {id}, select: {id: true, email: true, role: true}});
}

export const findAll = async () => {
    return await prisma.user.findMany({select: {id: true, email: true, role: true}});
}

export const matchPassword = async (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted);
}

