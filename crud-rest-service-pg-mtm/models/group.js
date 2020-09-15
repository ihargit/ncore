import schema from './groupSchema';
const { DataTypes } = require('sequelize');
import sequelize from './db';

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    tableName: 'groups',
    underscored: true
});

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

export default new GroupModel(Group);
