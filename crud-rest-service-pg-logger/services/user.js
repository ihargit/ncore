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

    async getUserByCredentials(login, password) {
        return (await this.userModel.getUserByCredentials(login, password))[0];
    }

    async getAutoSuggestUsers(loginSubstring, limit) {
        return (await this.userModel.getUsers())
            .filter(({ login }) => login && login.includes(loginSubstring))
            .sort((a, b) => a.login - b.login)
            .slice(0, limit);
    }
}
