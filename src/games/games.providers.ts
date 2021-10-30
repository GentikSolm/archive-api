import { Game } from './game.entity';

export const gamesProviders = [
    {
        provide: 'GameRepository',
        useValue: Game
    }
]