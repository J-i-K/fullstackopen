import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const get = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
  .catch(error => console.error(`Error getting data: ${error}!`))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response)
  .catch(error => console.error(`Error creating record: ${error}!`))
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        console.log('delete response')
        return response
    })
    // .catch(error => {
    //     console.log(`delete error ${error}`, error)
    //     throw new Error(error)})
  }

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response)
}

export default { get, create, remove, update }