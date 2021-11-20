import { models } from '../../database/models/'

const { tags } = models

export default {
  Query: {
    async tags (_, { user_id: userId}) {
      const tag = await tags.findAll({ where: { user_id: userId } })
      return tag
    }
  }
}
