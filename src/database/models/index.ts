require('dotenv').config();

import { Sequelize } from "sequelize"
import { initModels } from "./init-models"

const env = process.env.NODE_ENV || 'development';

import configs from '../config/config'
const config = configs[env]

export const models = initModels(new Sequelize(config.database, config.username, config.password, config))