import axios from 'axios' // npm install axios
const baseUrl = 'http://localhost:3003/api/blogs' || '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`;
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, setToken }