import { Transaction } from './transaction.entity'

export const actionProviders = [
    {
        provide: 'TransactionRepository',
        useValue: Transaction
    }
]