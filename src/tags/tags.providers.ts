import { Tag } from './tag.entity';

export const gamesProviders = [
    {
        provide: 'TagRepository',
        useValue: Tag
    }
]