export default class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUser(userId) {
        return await this.userModel.findById(userId);
    }
}
