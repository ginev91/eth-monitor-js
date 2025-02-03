import { Sequelize, DataTypes } from 'sequelize';

// Use in-memory SQLite for quick testing
const sequelize = new Sequelize('sqlite::memory:');

const TestModel = sequelize.define('TestModel', {
    key: DataTypes.STRING,
    value: DataTypes.STRING,
});

const runTest = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const result = await TestModel.create({ key: 'test_key', value: '12345' });
        logger.info('Insert successful:', result.toJSON());
    } catch (error) {
        logger.error('Insert error:', error);
    } finally {
        await sequelize.close();
    }
};

runTest();