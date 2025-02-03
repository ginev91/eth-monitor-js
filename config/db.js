import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../config/database.sqlite');

const sequelize = new Sequelize('sqlite::memory:', { logging: false });
export default sequelize;