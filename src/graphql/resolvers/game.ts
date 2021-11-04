import { models } from '../../database/models/'

const { games } = models

export default {
  Query: {
    async games (_, { user_id: userId }) {
      console.log(userId)
      const _games = await games.findAll({ where: { user_id: userId } })
      return _games
    }
  }
}
