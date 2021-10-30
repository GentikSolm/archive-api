import { User } from './user.entity'

export const actionProviders = [
    {
        provide: 'UserRepository',
        useValue: User
    }
]