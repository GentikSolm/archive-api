import { models } from '../../database/models/'

const { tags } = models

export default {
  Query: {
    async tags(_, { user_id }) {
      const tag = await tags.findAll({ where: { user_id: user_id } })
      return tag
    }
  }
}