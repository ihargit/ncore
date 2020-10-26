import GroupService from '../../services/group';

describe('group services', () => {
    let mockGroupModel;
    let groupService;
    const group = Object.freeze({
        id: '123',
        name: 'group',
        permissions: ['qwerty']
    });
    const { name, permissions, id } = group;
    beforeEach(() => {
        mockGroupModel = {
            findByIdWithUsers: jest.fn().mockImplementation(() => Promise.resolve(group)),
            getGroups: jest.fn().mockImplementation(() => Promise.resolve([group])),
            createGroup: jest.fn().mockImplementation(() => Promise.resolve(group)),
            updateGroup: jest.fn().mockImplementation(() => Promise.resolve(group)),
            deleteGroup: jest.fn().mockImplementation(() => Promise.resolve(1))
        };
        groupService = new GroupService(mockGroupModel);
    });

    test('getGroup', async () => {
        expect(await groupService.getGroup(id)).toEqual(group);
    });

    test('getGroups', async () => {
        expect(await groupService.getGroups()).toEqual([group]);
    });

    test('createGroup', async () => {
        const result = await groupService.createGroup({ name, permissions });
        expect(result).toEqual(group);
        expect(mockGroupModel.createGroup.mock.calls[0]).toContain(name, permissions);
    });

    test('updateGroup', async () => {
        const result = await groupService.updateGroup(id, { name, permissions });
        expect(result).toEqual(group);
        expect(mockGroupModel.updateGroup).toHaveBeenLastCalledWith(id, name, permissions);
    });

    test('deleteGroup', async () => {
        const result = await groupService.deleteGroup(id);
        expect(result).toEqual(1);
        expect(mockGroupModel.deleteGroup).toHaveBeenLastCalledWith(id);
    });
});

