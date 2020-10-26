import UserService from '../../services/user';

describe('user services', () => {
    let mockUserModel;
    let userService;
    const user = Object.freeze({
        id: '123',
        login: 'user',
        password: 'qwerty',
        age: '33'
    });
    const { login, password, age, id } = user;
    beforeEach(() => {
        mockUserModel = {
            findByIdWithGroups: jest.fn().mockImplementation(() => Promise.resolve(user)),
            getUsers: jest.fn().mockImplementation(() => Promise.resolve([user])),
            createUser: jest.fn().mockImplementation(() => Promise.resolve(user)),
            updateUser: jest.fn().mockImplementation(() => Promise.resolve(user)),
            deleteUser: jest.fn().mockImplementation(() => Promise.resolve(1)),
            getUserByCredentials: jest.fn().mockImplementation(() => Promise.resolve([{ id, login, password }]))
        };
        userService = new UserService(mockUserModel);
    });

    test('getUser', async () => {
        expect(await userService.getUser(id)).toEqual(user);
    });

    test('getUsers', async () => {
        expect(await userService.getUsers()).toEqual([user]);
    });

    test('createUser', async () => {
        const result = await userService.createUser({ login, password, age });
        expect(result).toEqual(user);
        expect(mockUserModel.createUser.mock.calls[0]).toContain(login, password, age);
    });

    test('updateUser', async () => {
        const result = await userService.updateUser(id, { login, password, age });
        expect(result).toEqual(user);
        expect(mockUserModel.updateUser).toHaveBeenLastCalledWith(id, login, password, age);
    });

    test('deleteUser', async () => {
        const result = await userService.deleteUser(id);
        expect(result).toEqual(1);
        expect(mockUserModel.deleteUser).toHaveBeenLastCalledWith(id);
    });

    test('getUserByCredentials', async () => {
        const result = await userService.getUserByCredentials(login, password);
        expect(result).toEqual({ id, login, password });
        expect(mockUserModel.getUserByCredentials).toHaveBeenLastCalledWith(login, password);
    });

    test('getAutoSuggestUsers', async () => {
        const result = await userService.getAutoSuggestUsers(login.slice(0, 2), 1);
        expect(result).toEqual([user]);
    });
});
