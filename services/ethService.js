import { ethers } from 'ethers';
import delay from '../utils/delay.js';
import logger from '../utils/logger.js';

const monitorTransactions = async ({ Configuration, Transaction, provider }) => {
  const configurations = await Configuration.findAll();

  provider.on('pending', async (txHash) => {
    try {
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
      await handleError(error);
    }
  });
};

const matchesConfiguration = (tx, Configuration) => {
  // not sure what rules can be applied here, so I'm just checking if the value of the transaction is greater than the threshold
  return ethers.utils.formatEther(tx.value) > Configuration.value.threshold;
};

const handleError = async (error) => {
  if (error.error.code === 429) {
    let attempt = 1;
    let delayTime = 5000; 

    while (error.error.code === 429) {
      logger.error(`Rate limit exceeded. Retrying in ${delayTime / 1000} seconds...`);
      
      await delay(delayTime);

      attempt += 1;
      delayTime = delayTime * 2; // exponential backoff due to rate limit need to get more familiar with infura
      
    }
  } else {
    logger.error('Error processing transaction:', error);
  }
};

export default monitorTransactions;