import schema from './userSchema';
const { Sequelize, DataTypes } = require('sequelize');
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST } = process.env;
// const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
//     host: DB_HOST,
//     dialect: 'postgres'
const sequelize = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}/${POSTGRES_DB}`, {
    dialect: 'postgres'
    // anything else you want to pass
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
    isDeleted: {
        type: DataTypes.STRING,
        allowNull: false
    }
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
        const userData =  await this.user.findAll({
            where: {
                id: userId
            }
        });
        return Boolean(userData.isDeleted) ? null : userData;
    }

    async createUser(id, login, password, age, isDeleted) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        await this.user.define({
            id,
            login,
            password,
            age,
            isDeleted: String(isDeleted)
        }).save();
        return await this.findById(id);
    }

    async updateUser(id, login, password, age) {
        const validationError = await this.reportInvalidData(...arguments);
        if (validationError) {
            return validationError;
        }
        const theUser = this.findById(id);
        if (!theUser || Boolean(theUser.isDeleted)) {
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
        console.log(JSON.stringify(await this.user.findAll()));
        return await this.user.findAll().filter(data => !Boolean(data.isDeleted));
    }

    async deleteUser(userId) {
        const theUser = this.findById(userId);
        if (theUser && !Boolean(theUser.isDeleted)) {
            await User.update({ isDeleted: 'true' }, {
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
