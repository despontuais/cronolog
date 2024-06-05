import { User } from '@prisma/client';
import { prisma } from '../libs/prisma';
import * as UserService from './UserService';

describe('Testing user service', () => {


    beforeAll(async () => {
        await prisma.user.deleteMany({});
    })

    const name = 'test';
    const email = 'test@test.com';
    const password = '2030';
    const birthDate = '05/02/2010';
    
    const email2 = 'anothertest@test.com';
    const password2 = '4050';
    const name2 = '';

    it('should create a new user (with a name)', async () => {
        const newUser = await UserService.createUser(email, password, name, birthDate) as User;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser.email).toBe(email);
        expect(newUser.username).toBe(name);
    });

    it('should not create a new user without a name', async () => {
        const newUser = await UserService.createUser(email2, password2, name2, birthDate) as User;
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should not allow to create a user with existing email', async () => {
        const newUser = await UserService.createUser(email, password, name, birthDate);
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should find a user by the email', async () => {
        const user = (await UserService.findByEmail(email))!;
        expect(user.email).toBe(email);
    });

    it('should match the password from database', async () => {
        const user = (await UserService.findByEmail(email))! 
        const match = await UserService.matchPassword(password, user.password);
        expect(match).toBeTruthy();
    })

    it('should not match the password from database', async () =>{
        const user = (await UserService.findByEmail(email))!;
        const match = await UserService.matchPassword('anything', user.password);
        expect(match).toBeFalsy();
    });
});
