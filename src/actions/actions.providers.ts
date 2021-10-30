import { Action } from './action.entity'

export const actionProviders = [
    {
        provide: 'ActionRepository',
        useValue: Action
    }
]