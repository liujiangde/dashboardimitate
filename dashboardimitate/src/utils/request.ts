import axios, { AxiosRequestConfig } from 'axios'
// 为啥用store 不能用 useStore=>报错了
import { store } from '@/store'
import { ElMessageBox, ElMessage } from 'element-plus'

import router from '@/router/'
const instance = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api/admin/'
})
instance.defaults.timeout = 2500
// 你可以在请求或响应被then或catch处理之前拦截它们
// 请求拦截器
// Add a request interceptor
instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  // Do something before request is sent
  // 通常会统一设置用户身份，token
  const user = store.state.user

  if (user && user.token) {
    // 如何抑制TypeScript“错误TS2533：对象可能是'null'或'undefined'”？
    // https://www.itranslater.com/qa/details/2137198831400911872
    config.headers!.Authorization = `Bearer ${user.token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
let isRefreshing = false

// 响应拦截器
// Add a response interceptor
instance.interceptors.response.use(function (response) {
  const data = response.data
  // if (data.status && data.status !== 410000) {
  //   return Promise.reject(response)
  // }
  if (!data.status || data.status === 200) {
    return response
  }

  if (data.status === 410000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm(
      '您的登陆已过期',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'logout-exitAcc-comform'
      }
    ).then(
      () => {
        store.commit('setUser', null)
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        })
      }
    ).finally(() => {
      isRefreshing = false
    })
  }
  ElMessage.error(response.data.msg || '请求失败，请稍后再试')
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 统一处理接口响应错误，比如 token过期，无效，服务端异常
  // eslint-disable-next-line no-debugger
  // message.warning('请先登录')
  return Promise.reject(response)
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
// 允许在向服务器发送前，修改请求数据
// instance.defaults.transformRequest = [function (data) {
//   // 对 data 进行任意转换处理
//   return data;
// }],
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
//  transformResponse: [function (data) {
//   // 对 data 进行任意转换处理
//   return data;
// }],

// 在 node.js 用GET请求获取远程图片
// axios({
//   method: 'get',
//   url: 'http://bit.ly/2mTM3nY',
//   responseType: 'stream'
// })
//   .then(function (response) {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//   })

export default <T = any> (config: AxiosRequestConfig) => {
  return instance(config).then((res) => {
    return (res.data.data || res.data) as T
  })
}
