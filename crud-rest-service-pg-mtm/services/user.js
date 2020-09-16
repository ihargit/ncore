import { v4 as uuidv4 } from 'uuid';

export default class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUser(userId) {
        return await this.userModel.findByIdWithGroups(userId);
    }

    async getUsers() {
        return await this.userModel.getUsers();
    }

    async createUser({ login, password, age }) {
        const id = uuidv4();
        return await this.userModel.createUser(id, login, password, age);
    }

    async updateUser(id, { login, password, age }) {
        return await this.userModel.updateUser(id, login, password, age);
    }

    async deleteUser(id) {
        return await this.userModel.deleteUser(id);
    }

    async getAutoSuggestUsers(loginSubstring, limit) {
        return (await this.userModel.getUsers())
            .filter(({ login }) => login && login.includes(loginSubstring))
            .sort((a, b) => a.login - b.login)
            .slice(0, limit);
    }

    // async addUsersToGroup(groupId, userIds) {
    //     // TODO check if group exists
    //     // TODO check if all users exist
    //     // add users
    //     return (await this.userModel.getUsers())
    //         .filter(({ login }) => login && login.includes(loginSubstring))
    //         .sort((a, b) => a.login - b.login)
    //         .slice(0, limit);
    // }
}
