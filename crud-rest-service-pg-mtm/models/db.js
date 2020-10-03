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
    }
}, {
    tableName: 'users',
    underscored: true
});

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

sequelize.define('UserGroup', {
    group_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user_group',
    underscored: true,
    timestamps: false
});

Group.belongsToMany(sequelize.models.User, {
    through: 'user_group',
    as: 'users',
    foreignKey: 'group_id'
});

User.belongsToMany(Group, {
    through: 'user_group',
    as: 'groups',
    foreignKey: 'user_id'
});

export default sequelize;
