import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
            fakeHashProvider,
        );
    });

    it('Isto deve permitir a redefinição de senha', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Marcelo Cavalcanti',
            email: 'marcelo@gmail.com',
            password: '123456',
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: '123123',
            token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('Isto NÃO DEVE permitir a redefinição de senha quando o token não existe', async () => {
        await expect(
            resetPassword.execute({
                token: 'token não-existente',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Isto NÃO DEVE permitir a redefinição de senha quando o usuário não existe', async () => {
        const { token } = await fakeUserTokenRepository.generate(
            'usuário não-existente',
        );

        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Isto NÃO DEVE permitir a redefinição de senha quando for solicitado após 2h', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Marcelo Cavalcanti',
            email: 'marcelo@gmail.com',
            password: '123456',
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                password: '123123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
