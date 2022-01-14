// router是开发人员做业务处理的利器（比如你可以通过router去use你自己写的针对某个特定路由的中间件），这样的好处可以更细的划分controller，router就是一个mini的app。router可以更细的划分controller。
import { Router } from 'express'
import { users, tokens, uuid } from './data'

const router = Router()

const genToken = (): string => uuid() + uuid()

//token的生效时间
const accessTokenLifetime = 10 * 60 * 1000 // 10 minutes

router.post('/token', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { grant_type, username, password, refresh_token } = req.body

  if (grant_type === 'password') {
    const user = users.find(u => u.username === username && u.password === password)
    if (user == null) {
      return res.status(401).send({ message: 'Bad credentials: invalid username or password' })
    }

    const token = {
      access: genToken(),
      refresh: genToken(),
      expires: Date.now() + accessTokenLifetime,
      userId: user.id
    }
    // 在这里生成了用户列表
    tokens.push(token)

    res.send({
      token_type: 'Bearer',
      expires_in: (token.expires - Date.now()) / 1000,
      access_token: token.access,
      refresh_token: token.refresh
    })
  } else if (grant_type === 'refresh_token') {
    const token = tokens.find(t => t.refresh === refresh_token)
    if (token == null) {
      return res.status(403).send({ message: 'Bad credentials: invalid refresh_token' })
    }

    token.access = genToken()
    token.expires = Date.now() + accessTokenLifetime

    res.send({
      token_type: 'Bearer',
      expires_in: (token.expires - Date.now()) / 1000,
      access_token: token.access,
      refresh_token: token.refresh
    })
  } else {
    res.status(400).send({ message: 'Bad Request: invalid grant_type' })
  }
})

router.delete('/token', (req, res) => {
  const { token } = req.body
  const tokenIndex = tokens.findIndex(t => t.refresh === token)
  if (tokenIndex !== -1) {
    tokens.splice(tokenIndex, 1)
  }
  res.send({ message: 'refresh_token revoked' })
  // TODO: res.status(401).send({ message: 'Bad credentials: invalid refresh_token' })
})

export default router
