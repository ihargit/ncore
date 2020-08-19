const database = {};

class UserModel {
    constructor(dataBase) {
        this.database = dataBase;
    }
    async findById(userId) {
        return await this.database[userId];
    }
}

export default new UserModel(database);
