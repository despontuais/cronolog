import { Prisma, PrismaClient, Usuario } from '@prisma/client';
import { prisma } from '../libs/prisma';
import * as UserService from './UserService';

describe('Testing user service', () => {


    beforeAll(async () => {
        await prisma.usuario.deleteMany({});
    })

    let name = 'test';
    let email = 'test@test.com';
    let password = '2030';
    let birthDate = '05/02/2010';
    
    let email2 = 'anothertest@test.com';
    let password2 = '4050';
    let name2 = '';
    let birthDate2 = '05/28/2010';


    it('should create a new user (with a name)', async () => {
        const newUser = await UserService.createUser(email, password, name, birthDate) as Usuario;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser.Email).toBe(email);
        expect(newUser.Nome_Usuario).toBe(name);
    });

    it('should not create a new user without a name', async () => {
        const newUser = await UserService.createUser(email2, password2, name2, birthDate) as Usuario;
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should not allow to create a user with existing email', async () => {
        const newUser = await UserService.createUser(email, password, name, birthDate);
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should find a user by the email', async () => {
        const user = await UserService.findByEmail(email) as Usuario;
        expect(user.Email).toBe(email);
    });

    it('should match the password from database', async () => {
        const user = await UserService.findByEmail(email) as Usuario
        const match = await UserService.matchPassword(password, user.Senha);
        expect(match).toBeTruthy();
    })

    it('should not match the password from database', async () =>{
        const user = await UserService.findByEmail(email) as Usuario;
        const match = await UserService.matchPassword('anything', user.Senha);
        expect(match).toBeFalsy();
    });
});