import schema from './userGroupSchema';
import sequelize from './db';

class UserGroupModel {
    constructor(userGroup) {
        this.userGroup = userGroup;
    }

    async addUsersToGroup(group_id, user_ids) {
        try {
            return await sequelize.transaction(async (t) => {
                for (const user_id of user_ids) {
                    await schema.validateAsync({ group_id, user_id });
                    await this.userGroup.create({
                        group_id,
                        user_id
                    }, {
                        fields: ['group_id', 'user_id'],
                        returning: ['group_id', 'user_id'],
                        transaction: t
                    });
                }
                return group_id;
            });
        } catch (error) {
            return error;
        }
    }
}

export default new UserGroupModel(sequelize.models.UserGroup);
