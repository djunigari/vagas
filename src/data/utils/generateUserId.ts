export const generateUserId = () => {
  lastId++
  return lastId
}

let lastId = 1
