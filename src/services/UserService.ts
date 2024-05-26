import { Prisma, Usuario } from "@prisma/client";
import { prisma } from "../libs/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';
import logger from "../libs/logger";

export const createUser = async (email: string, password: string, name: string, birthDate: string) =>{
    if(!validator.isEmail(email)){
        return new Error('E-mail inválido');
    }
    if(!name || validator.isEmpty(name)){
        return new Error('Insira um nome de usuário');
    }

    if(!birthDate || validator.isDate(birthDate.toString(), {format: "DD/MM/YYYY", strictMode: true})){
        return new Error('Data de nascimento inválida!');
    }
    let DT_nascimento = dateHandler(birthDate);
    logger.info(DT_nascimento);

    const hasUserEmail: Usuario | null = await findByEmail(email);
    const hasUserName: Usuario | null = await prisma.usuario.findUnique({where: {Nome_Usuario: name}});
    if(hasUserEmail){
        return new Error('E-mail já cadastrado');
    }
    if(hasUserName){
        return new Error('Nome de usuário já utilizado');
    }
    const hash = bcrypt.hashSync(password, 10);
    const user: Prisma.UsuarioCreateInput = {
        Email: email,
        Senha: hash,
        Nome_Usuario: name,
        DT_nascimento
    };
    const newUser = await prisma.usuario.create({data: user})
    return newUser;
}

export const findByEmail = async (email: string) => {
    return await prisma.usuario.findUnique({where: {Email: email}});
}

export const findById = async (id: number) => {
    return await prisma.usuario.findUnique({where: {ID_Usuario: id}, select: {ID_Usuario: true, Email: true}});
}

export const findAll = async () => {
    return await prisma.usuario.findMany({select: {ID_Usuario: true, Email: true}});
}

export const matchPassword = async (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted);
}

const dateHandler = (birthDateString: string): Date => {
    let dateArray = birthDateString.split('/').reverse();
    let birthDate = new Date(dateArray.join("-"));

    return birthDate;
}