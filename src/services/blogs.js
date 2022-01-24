import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
let config = null

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`
    config = {
      headers: {
        Authorization: token
      }
    }
  } else {
    token = null
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

const update = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.put(url, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.delete(url, config)
  return response
}

const create = async (blog) => {
  blog = {...blog, likes: 0}
  console.log(blog)
  console.log(config)
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, login, setToken, create, update, deleteBlog }