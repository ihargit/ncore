import { v4 as uuidv4 } from 'uuid';

export default class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUser(userId) {
        return await this.userModel.findById(userId);
    }

    async getUsers() {
        return await this.userModel.getUsers();
    }

    async createUser({ login, password, age }) {
        const id = uuidv4();
        const isDeleted = false;
        return await this.userModel.createUser(id, login, password, age, isDeleted);
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
}
