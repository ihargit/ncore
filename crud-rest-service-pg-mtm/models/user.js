import schema from './userSchema';
const { DataTypes } = require('sequelize');
import sequelize from './db';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.NUMBER
    }
}, {
    tableName: 'users',
    underscored: true,
    paranoid: true
});

class UserModel {
    constructor(user) {
        this.user = user;
    }

    async reportInvalidData(id, login, password, age) {
        try {
            await schema.validateAsync({ id, login, password, age });
        } catch (err) {
            return err;
        }
    }
    async findById(userId) {
        return  await this.user.findAll({
            attributes: ['id', 'login', 'password', 'age'],
            where: {
                id: userId
            }
        });
    }

    async createUser(id, login, password, age) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        return await this.user.create({
            id,
            login,
            password,
            age
        });
    }

    async updateUser(id, login, password, age) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        return await this.user.update({ login, password, age }, {
            where: {
                id
            }
        });
    }

    async getUsers() {
        return await this.user.findAll({
            attributes: ['id', 'login', 'password', 'age']
        });
    }

    async deleteUser(userId) {
        return await this.user.destroy({
            where: {
                id: userId
            }
        });
    }
}

export default new UserModel(User);
