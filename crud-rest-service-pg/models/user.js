import schema from './userSchema';
const { Sequelize, DataTypes } = require('sequelize');
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
});

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
    },
    is_deleted: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
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
                id: userId,
                is_deleted: 'false'
            }
        });
    }

    async createUser(id, login, password, age, isDeleted) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        await this.user.create({
            id,
            login,
            password,
            age,
            is_deleted: String(isDeleted)
        });
        return await this.findById(id);
    }

    async updateUser(id, login, password, age) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        const theUser = this.findById(id);
        if (!theUser || Boolean(theUser.is_deleted)) {
            return null;
        }
        await this.user.update({ login, password, age }, {
            where: {
                id
            }
        });
        return await this.findById(id);
    }

    async getUsers() {
        return await this.user.findAll({
            attributes: ['id', 'login', 'password', 'age'],
            where: {
                is_deleted: 'false'
            }
        });
    }

    async deleteUser(userId) {
        const theUser = this.findById(userId);
        if (theUser && !Boolean(theUser.is_deleted)) {
            await User.update({ is_deleted: 'true' }, {
                where: {
                    id: userId
                }
            });
            return true;
        }
        return false;
    }
}

export default new UserModel(User);
