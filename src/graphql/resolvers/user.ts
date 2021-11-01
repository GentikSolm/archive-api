import { models } from '../../database/models/'

const { users } = models

export default {
  Query: {
    async users() {
      const _users = await users.findAll()
      return _users
    },

    async user(_, { user_id }) {
      const _user = await users.findOne({ where: { user_id: user_id } })
      console.log(_user)
      if (!_user) {
        throw new Error('User not found')
      }
      return _user
    }
  }
}