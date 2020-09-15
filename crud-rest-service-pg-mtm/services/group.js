import { v4 as uuidv4 } from 'uuid';

export default class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }
    async getGroup(groupId) {
        return await this.groupModel.findById(groupId);
    }

    async getGroups() {
        return await this.groupModel.getGroups();
    }

    async createGroup({ name, permissions }) {
        const id = uuidv4();
        return await this.groupModel.createGroup(id, name, permissions);
    }

    async updateGroup(id, { name, permissions }) {
        return await this.groupModel.updateGroup(id, name, permissions);
    }

    async deleteGroup(id) {
        return await this.groupModel.deleteGroup(id);
    }
}
