
import instancia from './instancia'

export default {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      instancia
        .post('/api/login', { username, password })
        .then((response) => {
          console.log('API AUTH: SUCCESS')
          return resolve(response.data)
        })
        .catch((error) => {
          console.log('API AUTH: ERROR')
          return reject(error)
        })
    })
  }
}