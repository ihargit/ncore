import schema from './groupSchema';
import sequelize from './db';

class GroupModel {
    constructor(group) {
        this.group = group;
    }

    async reportInvalidData(id, name, permissions) {
        try {
            await schema.validateAsync({ id, name, permissions });
        } catch (err) {
            return err;
        }
    }
    async findById(groupId) {
        return  await this.group.findAll({
            attributes: ['id', 'name', 'permissions'],
            where: {
                id: groupId
            }
        });
    }

    async findByIdWithUsers(groupId) {
        return  await this.group.findAll({
            attributes: ['id', 'name', 'permissions'],
            include: [{
                model: sequelize.models.User,
                as: 'users',
                required: false,
                attributes: ['id', 'login'],
                through: { attributes: [] }
            }],
            where: {
                id: groupId
            }
        });
    }

    async createGroup(id, name, permissions) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        return await this.group.create({
            id,
            name,
            permissions
        });
    }

    async updateGroup(id, name, permissions) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        return await this.group.update({ name, permissions }, {
            where: {
                id
            }
        });
    }

    async getGroups() {
        return await this.group.findAll({
            attributes: ['id', 'name', 'permissions']
        });
    }

    async deleteGroup(groupId) {
        return await this.group.destroy({
            where: {
                id: groupId
            }
        });
    }
}

export default new GroupModel(sequelize.models.Group);
