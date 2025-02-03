import DataTypes from 'sequelize';
import sequelize from '../config/db.js';

const Transaction = sequelize.define('Transaction', {
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ConfigurationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
export default Transaction;