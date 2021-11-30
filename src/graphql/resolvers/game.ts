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
    async addGame (_, { user_id: userId, name }) {
      let _game = await games.findOne({ where: { user_id: userId, game_name: name }})
      if (_game) {
        throw new Error('Game already exists!')
      }
      _game = await games.create({ game_name: name, user_id: userId })
      return _game
    },
    async editGame (_, { user_id: userId, name }) {
      const _game = await games.findOne({ where: { game_name: name, user_id: userId } })
      if(!_game) {
        throw new Error('Game not found!')
      }
      _game.game_name = name
      _game.save()
      return _game
    },
    async deleteGame (_, { user_id: userId, name }) {
      const _game = await games.findOne({ where: { game_name: name, user_id: userId } })
      if(!_game) {
        throw new Error('Game not found!')
      }
      await _game.destroy()
      return _game
    },
    async modifyGames (_, { user_id: userId, names }) {
      const _games = await games.findAll({ where: { user_id: userId } })
      await _games.forEach(async (game) => {
        await game.destroy()
      })

      let newGames = []

      await names.forEach(async (gameName) => {
        await newGames.push(games.create({ game_name: gameName, user_id: userId }))
      })
      return newGames
    }
  }
}
