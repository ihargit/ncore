import schema from './userSchema';

const database = {
    users: {}
};

class UserModel {
    constructor(dataBase) {
        this.users = dataBase.users;
    }

    async reportInvalidData(id, login, password, age) {
        try {
            await schema.validateAsync({ id, login, password, age });
        } catch (err) {
            return err;
        }
    }
    async findById(userId) {
        const userData =  await this.users[userId];
        return userData.isDeleted ? null : userData;
    }

    async createUser(id, login, password, age, isDeleted) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        this.users[id] = {
            id,
            login,
            password,
            age,
            isDeleted
        };
        return await this.users[id];
    }

    async updateUser(id, login, password, age) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        if (!this.users[id] || this.users[id].isDeleted === true) {
            return null;
        }
        Object.assign(this.users[id], { login, password, age });
        return await this.users[id];
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
