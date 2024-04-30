import { Prisma, User } from "@prisma/client";
import { prisma } from "../libs/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';

export const createUser = async (email: string, password: string, name?: string) =>{
    if(!validator.isEmail(email)){
        return new Error('E-mail inválido');
    }
    const hasUser: User | null = await prisma.user.findUnique({where: {email}});
    if(hasUser){
        return new Error('E-mail já cadastrado');
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

export const matchPassword = async (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted);
}