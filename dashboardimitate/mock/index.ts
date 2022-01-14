/**
 * Mock Server App
 */

/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import { tokens, users, Role } from './data'

const app = express()
// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置

// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())

// express.urlencoded 解析 URL-encoded 格式的请求体数据
app.use(express.urlencoded({ extended: true }))
//在menus.ts中有使用
app.request.can = function (role: Role) {
  return this.user != null && this.user.role >= role
}

// // delay response
// app.use((req, res, next) => setTimeout(next, 1000))

// authenticate
app.use((req, res, next) => {
  //判断 auth开头的 url
  if (req.path.startsWith('/auth')) return next()

  const [, accessToken] = req.headers.authorization?.split(' ') ?? []
  // token为空时
  if (accessToken == null) {
    return res.status(401).send({ message: 'Requires authentication' })
  }
  // tokens 用户token的一个数组
  const token = tokens.find(t => t.access === accessToken)
  if (token == null) {
    return res.status(401).send({ message: 'Bad credentials: invalid access_token' })
  }
  if (token.expires <= Date.now()) {
    return res.status(401).send({ message: 'Bad credentials: access_token expired' })
  }
  const user = users.find(u => u.id === token.userId)
  if (user == null) {
    return res.status(401).send({ message: 'Bad credentials: invalid access_token' })
  }
  req.user = user
  next()
})

// endpoints
//定义这些请求的各种路由 controller 的处理方式
app.use('/auth', require('./auth').default)
app.use('/menus', require('./menus').default)
app.use('/users', require('./users').default)
app.use('/labs', require('./labs').default)

// 404 responses
app.use((req, res) => res.status(404).json({ message: 'Not Found' }))

export default app
