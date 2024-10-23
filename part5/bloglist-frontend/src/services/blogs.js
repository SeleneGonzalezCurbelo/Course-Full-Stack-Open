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

export default { getAll, setToken }