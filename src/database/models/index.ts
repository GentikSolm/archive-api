import { Sequelize } from 'sequelize'
import { initModels } from './init-models'

import configs from '../config/config'

require('dotenv').config()

const env = process.env.NODE_ENV || 'development'
const config = configs[env]

export const models = initModels(new Sequelize(config.database, config.username, config.password, config))
