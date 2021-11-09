import { projectkey } from './constpool'

const getLocal =<T> (key: string): T => {
    const value = localStorage.getItem(key) || ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value as any
    }
}


export const set = (key: string, value: unknown): void => {
  localStorage.setItem(projectkey + key, JSON.stringify(value))
}

export const remove = (key: string): void => {
  localStorage.removeItem(projectkey + key)
}
