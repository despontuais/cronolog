import { Prisma, PrismaClient, User } from '@prisma/client';
import { prisma } from '../libs/prisma';
import * as UserService from './UserService';

describe('Testing user service', () => {


    beforeAll(async () => {
        await prisma.user.deleteMany({});
    })

    let name = 'test';
    let email = 'test@test.com';
    let password = '2030';
    
    let email2 = 'anothertest@test.com';
    let password2 = '4050';
    let name2 = '';

    it('should create a new user (with a name)', async () => {
        const newUser = await UserService.createUser(email, password, name) as User;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser.email).toBe(email);
        expect(newUser.name).toBe(name);
    });

    it('should not create a new user without a name', async () => {
        const newUser = await UserService.createUser(email2, password2, name2) as User;
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should not allow to create a user with existing email', async () => {
        const newUser = await UserService.createUser(email, password, name);
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should find a user by the email', async () => {
        const user = await UserService.findByEmail(email) as User;
        expect(user.email).toBe(email);
    });

    it('should match the password from database', async () => {
        const user = await UserService.findByEmail(email) as User
        const match = await UserService.matchPassword(password, user.password);
        expect(match).toBeTruthy();
    })

    it('should not match the password from database', async () =>{
        const user = await UserService.findByEmail(email) as User;
        const match = await UserService.matchPassword('anything', user.password);
        expect(match).toBeFalsy();
    });
});