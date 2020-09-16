import schema from './userGroupSchema';
import sequelize from './db';

class UserGroupModel {
    constructor(userGroup) {
        this.userGroup = userGroup;
    }

    async reportInvalidData(group_id, user_id) {
        try {
            await schema.validateAsync({ group_id, user_id });
        } catch (err) {
            return err;
        }
    }

    async createUserGroup(group_id, user_id) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        return await this.userGroup.create({
            group_id,
            user_id
        });
    }
}

export default new UserGroupModel(sequelize.models.UserGroup);
