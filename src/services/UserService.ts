import { Prisma, Usuario } from "@prisma/client";
import { prisma } from "../libs/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';
import moment from "moment";

export const createUser = async (email: string, password: string, name: string, birthDateString: string) =>{
    
    //email validation
    if(!validator.isEmail(email)){
        return new Error('E-mail inválido');
    }
    const hasUserEmail: Usuario | null = await findByEmail(email);
    if(hasUserEmail){
        return new Error('E-mail ja cadastrado');
    }

    //username validation
    if(!name || validator.isEmpty(name)){
        return new Error('Nome de usuario nao pode ser nulo');
    }
    const hasUserName: Usuario | null = await prisma.usuario.findUnique({where: {Nome_Usuario: name}});
    if(hasUserName){
        return new Error('Nome de usuário já utilizado');
    }

    //birth validation
    if(!birthDateString){
        return new Error('Data de nascimento nao pode ser nula.');
    }
    let dateMomentObject = moment(birthDateString, "DD/MM/YYYY");
   if(!dateMomentObject.isValid()){
        return new Error('Data de nascimento invalida');
    }
    let DT_nascimento = dateMomentObject.toDate();


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
