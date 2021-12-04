import { models } from '../../database/models/'

const { games } = models

export default {
  Query: {
    async games (_, { user_id: userId }) {
      const _games = await games.findAll({ where: { user_id: userId } })
      return _games
    },
  },
  Mutation: {
    async addGame (_, { user_id: userId, name }, { isAuth }) {
      try {
        if (!isAuth) {
          throw new Error('Unauthenticated!')
        }
        let _game = await games.findOne({ where: { user_id: userId, game_name: name }})
        if (_game) {
          throw new Error('Game already exists!')
        }
        _game = await games.create({ game_name: name, user_id: userId })
        return _game
      } catch(e) {
        throw e
      }
    },
    async editGame (_, { user_id: userId, name }, { isAuth }) {
      try {
        if (!isAuth) {
          throw new Error('Unauthenticated!')
        }
        const _game = await games.findOne({ where: { game_name: name, user_id: userId } })
        if(!_game) {
          throw new Error('Game not found!')
        }
        _game.game_name = name
        _game.save()
        return _game
      } catch(e) {
        throw e
      }
    },
    async deleteGame (_, { user_id: userId, name }, { isAuth }) {
      try {
        if (!isAuth) {
          throw new Error('Unauthenticated!')
        }
        const _game = await games.findOne({ where: { game_name: name, user_id: userId } })
        if(!_game) {
          throw new Error('Game not found!')
        }
        await _game.destroy()
        return _game
      } catch(e) {
        throw e
      }
    },
    async modifyGames (_, { user_id: userId, names }, { isAuth }) {
      try {
        if (!isAuth) {
          throw new Error('Unauthenticated!')
        }
        const _games = await games.findAll({ where: { user_id: userId } })
        await _games.forEach(async (game) => {
          await game.destroy()
        })

        let newGames = []

        await names.forEach(async (gameName) => {
          await newGames.push(games.create({ game_name: gameName, user_id: userId }))
        })
        return newGames
      } catch(e) {
        throw e
      }
    }
  }
}
