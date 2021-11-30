import { models } from '../../database/models/'
import { sign } from 'jsonwebtoken'
const { users } = models

export default {
  Query: {
    async users() {
      const _users = await users.findAll()
      return _users
    },
    async pagedusers(_, { page, limit }) {
      const _users = await users.findAll({
        order: [['rep', 'DESC']]
      })
      return _users.slice((page - 1) * limit, page * limit)
    },
    async user(_, { user_id: userId }) {
      const _user = await users.findOne({ where: { user_id: userId } })
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
          expiration: 1
        }
      }
    },
  },
  Mutation: {
    async curse(_, { sender, receiver }) {
      try {
        const _sender = await users.findOne({ where: { user_id: sender } })
        if (!_sender) {
          throw new Error('User not found')
        }
        const _receiver = await users.findOne({ where: { user_id: receiver } })
        if (!_receiver) {
          throw new Error('User not found')
        }

        return _receiver
      } catch(e) {
        throw e
      }
    },

    async thank(_, { sender, receiver }) {
      try {
        const _sender = await users.findOne({ where: { user_id: sender } })
        if (!_sender) {
          throw new Error('User not found')
        }
        const _receiver = await users.findOne({ where: { user_id: receiver } })
        if (!_receiver) {
          throw new Error('User not found')
        }

        return _receiver
      } catch(e) {
        throw e
      }
    },
    async editBio(_, { user_id: userId, bio }) {
        try{
            let _user = await users.findOne({ where: { user_id: userId } })
            if (!_user) {
                throw new Error('User not found')
            }
            _user.bio = bio
            _user.save()
            return _user
        }
        catch(e) {
            throw e
        }
    }
  }
}
