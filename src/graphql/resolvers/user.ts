import { models } from '../../database/models/'
import { sign } from 'jsonwebtoken'
const { users, transactions } = models

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
    async curse(_, { sender, receiver }, {isAuth}) {
      try {
        if (!isAuth) {
          throw new Error('Unauthenticated')
        }
        const _sender = await users.findOne({ where: { user_id: sender } })
        if (!_sender) {
          throw new Error('Sender not found')
        }
        const _receiver = await users.findOne({ where: { user_id: receiver } })
        if (!_receiver) {
          throw new Error('Receiver not found')
        }
        let rep
        let transLimit
        let repeatTime
        let mesPerm
        if (_sender.rep >= 100) {
          rep = 3
          transLimit = -1
          repeatTime = 'MONTH'
          mesPerm = true
        } else if (_sender.rep >= 10) {
          rep = 2
          transLimit = 50
          repeatTime = 'MONTH'
          mesPerm = false
        } else {
          rep = 1
          transLimit = 10
          repeatTime = 'NEVER'
          mesPerm = false
        }
        if(_sender.total_trans >= transLimit && transLimit !== -1) {
          throw new Error("Transaction Limit Reached!")
        }

        const lastTrans = await transactions.findOne({where: {sender, receiver}, order: [['time', 'DESC']]})

        if(repeatTime == 'NEVER' && !lastTrans)
          throw new Error("Not Allowed To Repeat These Transactions Until A Higher Rank")
        else if(repeatTime == 'MONTH') {
          const currentTime = new Date(Date.now())
          if(lastTrans) {
            if(lastTrans.time.getMonth() - currentTime.getMonth() == 0) {
              if(lastTrans.time.getDate() - currentTime.getDate() < 28) {
                throw new Error("It's been Too Soon Since Last Interaction With This User.")
              }
            }
          }
        }

        _receiver.rep -= rep
        
        await _receiver.save()
        await transactions.create({ sender, receiver, action_id: 2 })
        return _receiver
      } catch(e) {
        throw e
      }
    },

    async thank(_, { sender, receiver }, {isAuth}) {
      try {
        if (!isAuth) {
          throw new Error('Unauthenticated')
        }
        const _sender = await users.findOne({ where: { user_id: sender } })
        if (!_sender) {
          throw new Error('Sender not found')
        }
        const _receiver = await users.findOne({ where: { user_id: receiver } })
        if (!_receiver) {
          throw new Error('Receiver not found')
        }

        let rep
        let transLimit
        let repeatTime
        let mesPerm
        if (_sender.rep >= 100) {
          rep = 3
          transLimit = -1
          repeatTime = 'MONTH'
          mesPerm = true
        } else if (_sender.rep >= 10) {
          rep = 2
          transLimit = 50
          repeatTime = 'MONTH'
          mesPerm = false
        } else {
          rep = 1
          transLimit = 10
          repeatTime = 'NEVER'
          mesPerm = false
        }
        if(_sender.total_trans >= transLimit && transLimit !== -1) {
          throw new Error("Transaction Limit Reached!")
        }

        const lastTrans = await transactions.findOne({where: {sender, receiver}, order: [['time', 'DESC']]})
        
        if(repeatTime == 'NEVER' && lastTrans)
          throw new Error("Not Allowed To Repeat These Transactions Until A Higher Rank")
        else if(repeatTime == 'MONTH') {
          const currentTime = new Date(Date.now())
          if(lastTrans) {
            if(lastTrans.time.getMonth() - currentTime.getMonth() == 0) {
              if(lastTrans.time.getDate() - currentTime.getDate() < 28) {
                throw new Error("It's been Too Soon Since Last Interaction With This User.")
              }
            }
          }
        }

        _receiver.rep += rep

        await _receiver.save()

        await transactions.create({ sender, receiver, action_id: 1 })

        return _receiver
      } catch(e) {
        throw e
      }
    },
    async editBio(_, { user_id: userId, bio }, {isAuth}) {
        try{
          if (!isAuth) {
            throw new Error('Not authenticated')
          }
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
