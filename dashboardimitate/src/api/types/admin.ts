export interface IListParams {
  page:number,
  limit:number,
  name:string,
  roles:string,
  status: 0 | 1 | '' // 被禁用管理员0, 启用管理员 1, 所有状态管理员 ""
}
export interface Admin {
  id:number
  account:string
  head_pic:string
  pwd:string
  real_name:string
  roles:string
  last_ip:string
  last_time:number
  add_time:number
  login_count:number
  level:number
  status:0|1
  is_del:0|1
  _add_time:string
  _last_time:string

}
export interface ICreateAdmin {
  account:string
  pwd:string
  conf_pwd:string
  roles:string []
  status:number
  real_name:string
}
