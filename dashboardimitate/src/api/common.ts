/**
 * 公共基础接口
 */

import instance from '@/utils/request'
import { ILoginInfo } from './types/common'

export const getLogin = () => {
  return instance({
    method: 'GET',
    url: '/login'
  })
}
export const getVertifyCode = () => {
  return instance<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now()
    },
    // TypeError: Failed to execute 'createObjectURL' on 'URL': Overload resolution failed.
    responseType: 'blob' // 请求获取图片数据
  })
}
// 获取logo
export const getLoginInfo = () => {
  return instance<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}
