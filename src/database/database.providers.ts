import { Sequelize } from "sequelize-typescript"
import { User } from '../users/user.entity'
import { Game } from '../games/game.entity'
import { Tag } from '../tags/tag.entity'
import { Transaction } from '../transactions/transaction.entity'
import { Action } from '../actions/action.entity'

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: '',
                password: '',
                database: 'reppodb',
                models: [User, Game, Tag, Transaction, Action],
                logging: false,
            })
            await sequelize.sync()
            return sequelize
        }
    }]