import { ethers } from 'ethers';
import delay  from '../utils/delay.js';

const monitorTransactions = async ({ Configuration, Transaction, provider }) => {
  const configurations = await Configuration.findAll();

  provider.on('pending', async (txHash) => {
    try {
      await delay(10000);

      const tx = await provider.getTransaction(txHash);
      if (tx) {
        for (const config of configurations) {
          if (matchesConfiguration(tx, config)) {
            await Transaction.create({
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: ethers.utils.formatEther(tx.value),
              ConfigurationId: config.id
            });
            logger.info(`Transaction ${tx.hash} matches Configuration ${config.id}`);
          }
        }
      }
    } catch (error) {
      handleError(error);
    }
  });
};

const matchesConfiguration = (tx, Configuration) => {
  // You could expand this logic for different rules
  return ethers.utils.formatEther(tx.value) > Configuration.value.threshold;
};

const handleError = (error) => {
  if (error.code === 429) {
    logger.error('Rate limit exceeded. Retrying...');
    delay(5000);
  } else {
    logger.error('Error processing transaction:', error);
  }
};

export default monitorTransactions;