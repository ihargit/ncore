import schema from './userSchema';
import sequelize from './db';

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

    async findByIdWithGroups(userId) {
        return  await this.user.findAll({
            attributes: ['id', 'login', 'password', 'age'],
            include: [{
                model: sequelize.models.Group,
                as: 'groups',
                required: false,
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }],
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

export default new UserModel(sequelize.models.User);
