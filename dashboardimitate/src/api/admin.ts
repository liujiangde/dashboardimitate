import instance from '@/utils/request'
import { IListParams, Admin, ICreateAdmin } from './types/admin'
export const getAdmin = (params:IListParams) => {
  return instance<{
    count:number
    list: Admin[]
  }>({
    method: 'GET',
    url: '/setting/admin',
    params: params
  })
}

export const createAdmin = (params: ICreateAdmin) => {
  return instance({
    method: 'POST',
    url: '/setting/admin',
    data: params
  })
}

export const updateAdmin = (id: number, params: ICreateAdmin) => {
  return instance({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data: params
  })
}
export const deleteAdmin = (id: number) => {
  return instance({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}

export const updateAdminStatus = (id: number, status: number) => {
  return instance({
    method: 'PUT',
    url: `/setting/admin/${id}/${status}`
  })
}
