import axios from 'axios' // npm install axios
const baseUrl = 'http://localhost:3003/api/blogs' || '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }