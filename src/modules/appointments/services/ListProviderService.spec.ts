import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProviderService;

describe('ListProvider', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviders = new ListProviderService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('Isto deve permitir a listagem de provedores de serviço', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Mariana',
            email: 'mariana@gmail.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Marise',
            email: 'marise@gmail.com',
            password: '123456',
        });

        const user3 = await fakeUsersRepository.create({
            name: 'Claudio',
            email: 'claudio@gmail.com',
            password: '123456',
        });

        const logedUser = await fakeUsersRepository.create({
            name: 'Marcelo',
            email: 'marcelo@gmail.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: logedUser.id,
        });

        expect(providers).toEqual([user1, user2, user3]);
    });
});
