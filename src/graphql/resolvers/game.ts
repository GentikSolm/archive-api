import { models } from '../../database/models/'

const { games } = models

export default {
  Query: {
    async games(_, { user_id }) {
      console.log(user_id)
      const _games = await games.findAll({ where: { user_id: user_id } })
      return _games
    }
  }
}