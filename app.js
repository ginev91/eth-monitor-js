import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/db.js';
import confRoutes from './routes/confRoutes.js';
import monitorTransactions from './services/ethService.js';
import Configuration from './models/Configuration.js';
import Transaction from './models/Transaction.js';
import { ethers } from 'ethers';
import logger from './utils/logger.js';


const INFURA_PROJECT_ID = 'eb8edd883536448987c37c5a1a55da96'; // easier to test without .env file notsecure this way
const provider = new ethers.WebSocketProvider(`wss://mainnet.infura.io/ws/v3/${INFURA_PROJECT_ID}`);

const app = express();
app.use(bodyParser.json());
app.use('/api/Configuration', confRoutes());

const startMonitoring = async () => {
    logger.info('Starting database synchronization...');

    try {
        await sequelize.sync({ force: true });
        logger.info('Database synchronized successfully.');

        logger.info('Starting monitoring...');
        
        await monitorTransactions({ Configuration, Transaction, provider });
        logger.info('Monitoring started successfully.');
    } catch (error) {
        logger.error('Unable to synchronize the database:', error);
    }
};

startMonitoring();

const PORT = 3010;
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});