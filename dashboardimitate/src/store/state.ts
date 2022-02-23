
export interface IUserInfo {
  id: number
  account: string
  headPic: string
}

export interface State {
  count: number,
  isSollapsed: boolean,
  user: (IUserInfo & { token: string }) | null
}
