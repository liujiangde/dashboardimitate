
const getLocal = (key) => {
    const value = window.localStorage.getItem(key) || ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
}
