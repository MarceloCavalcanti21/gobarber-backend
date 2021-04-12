import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );
    });

    it('Isto deve permitir a recuperação de senha usando seu email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        await fakeUsersRepository.create({
            name: 'Marcelo Cavalcanti',
            email: 'marcelo@gmail.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'marcelo@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('Isto NÃO DEVE permitir a recuperação de senha quando o usuário não tiver cadastro no sistema', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'marcelo@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Isto deve permitir a geração de um token de recuperação de senha', async () => {
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Marcelo Cavalcanti',
            email: 'marcelo@gmail.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'marcelo@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
