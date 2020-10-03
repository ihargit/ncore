export default class UserGroupServices {
    constructor(userGroupModel) {
        this.userGroupModel = userGroupModel;
    }

    async addUsersToGroup({ groupId, userIds }) {
        return await this.userGroupModel.addUsersToGroup(groupId, userIds);
    }
}
