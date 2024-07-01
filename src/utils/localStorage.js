export const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const getStorage = (key, fallback = null) => JSON.parse(localStorage.getItem(key)) ?? fallback

export const removeStorage = key => localStorage.removeItem(key)
