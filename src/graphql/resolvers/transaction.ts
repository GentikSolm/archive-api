import { models } from '../../database/models'
import { Op } from 'sequelize'
const { transactions } = models

export default {
    Query: {
        async alltransactions () {
            const _transactions = await transactions.findAll()
            return _transactions
        },
        async usertransactions (_, {user_id: userId}) {
            const _transactions = await transactions.findAll({ where: {[Op.or]: [{ sender: userId }, {receiver: userId}] }})
            return _transactions
        }
    }
}