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

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { get, create }