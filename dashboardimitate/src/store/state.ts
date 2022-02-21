
export interface IUserInfo {
  id: number
  account: string
  headPic: string
}

export interface State {
  count: number,
  isSollapsed: boolean,
  user: IUserInfo
}

const state: State = {
  count: 0,
  isSollapsed: false,
  user: {
    id: 0,
    account: '',
    headPic: ''
  }
}

export default state
