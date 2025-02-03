import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Configuration = sequelize.define('Configuration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    configKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Configuration;