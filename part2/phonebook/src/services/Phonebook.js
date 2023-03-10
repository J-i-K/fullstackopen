import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URI
console.log(baseUrl)

const get = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
  //.catch(error => console.error(`Error getting data: ${error}!`))
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response)
  // .catch(error => console.error(`Error creating record: ${error}!`))
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
  }

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response)
}

const phonebookService = { get, create, remove, update }
export default phonebookService