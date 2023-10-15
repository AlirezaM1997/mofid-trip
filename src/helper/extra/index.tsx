export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export const isValidPassportNo = (str) => {
  // Regex to check valid
  // Passport Number
  let regex = new RegExp(/^[A-Z0-9]{6,9}$/)

  // if str
  // is empty return false
  if (str == null) {
    return false
  }

  // Return true if the str
  // matched the ReGex
  return regex.test(str)
}

export const capitalizeFLetter = (text) => {
  const t = text.toLowerCase()
  return t[0].toUpperCase() + t.slice(1)
}

export const isBase64 = (image: string) => !image.startsWith("http")

export const getFullName = (user) => {
  if (user) {
    if (user.firstName && user.lastName) return user.firstName + " " + user.lastName
    if (user.lastName) return user.lastName
    if (user.firstName) return user.firstName
    if (user.id) return "User " + user.id
  }
}
