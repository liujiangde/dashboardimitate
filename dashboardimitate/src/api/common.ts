/**
 * 公共基础接口
 */

import instance from '@/utils/request'
import { ILoginResponse } from './types/common'

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
export const login = (data: {
  account: string,
  pwd: string,
  imgcode: string
}) => {
  return instance<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data
  })
}

export const logout = () => {
  return instance<ILoginResponse>({
    method: 'GET',
    url: '/setting/admin/logout'
  })
}
