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
    url: '/captcha_pro'
  })
}

// 获取logo
export const getLoginInfo = () => {
  return instance<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}
