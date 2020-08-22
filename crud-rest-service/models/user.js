const database = {
    users: {}
};
// add validation ajv or joi

class UserModel {
    constructor(dataBase) {
        this.users = dataBase.users;
    }
    async findById(userId) {
        const userData =  await this.users[userId];
        return userData.isDeleted ? null : userData;
    }

    async createUser(userId, login, password, age, isDeleted) {
        this.users[userId] = {
            id: userId,
            login,
            password,
            age,
            isDeleted
        };
        return await this.users[userId];
    }

    async updateUser(userId, login, password, age) {
        if (!this.users[userId] || this.users[userId].isDeleted === true) {
            return null;
        }
        Object.assign(this.users[userId], { login, password, age });
        return await this.users[userId];
    }

    async getUsers() {
        return Object.values(this.users).filter(data => !data.isDeleted);
    }

    async deleteUser(userId) {
        if (this.users[userId] && this.users[userId].isDeleted === false) {
            this.users[userId].isDeleted = true;
            return true;
        }
        return false;
    }
}

export default new UserModel(database);
