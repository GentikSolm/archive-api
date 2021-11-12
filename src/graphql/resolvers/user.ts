import { models } from '../../database/models/'
import { sign } from 'jsonwebtoken'
const { users } = models

export default {
  Query: {
    async users () {
      const _users = await users.findAll()
      return _users
    },

    async user (_, { user_id: userId }) {
      const _user = await users.findOne({ where: { user_id: userId } })
      console.log(_user)
      if (!_user) {
        throw new Error('User not found')
      }
      return _user
    },

    async login(_, { user_id: userId }) {
      const _user = await users.findOne({ where: { user_id: userId } })
      if (!_user) {
        throw new Error('User not found')
      }
      else {
        let token = await sign({ user_id: _user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return {
          user_id: _user.user_id,
          token,
          expiration: 60000
        }
      }
    }
  }
}
