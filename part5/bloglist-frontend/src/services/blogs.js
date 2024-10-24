import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.get(baseUrl, config)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}` 
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log("remove")
  console.log(response)
  return response.data
}

export default { getAll, setToken, create, update, remove }