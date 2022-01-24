import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import {Link, useParams} from "react-router-dom"
import {Table, TableBody, TableRow, TableCell,
TableContainer, Paper} from '@material-ui/core'
import { resetNotification } from '../reducers/notificationReducer'

export const Blog = () => {
    const blogs = useSelector(store => store.blogs)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

  const [like, setLikes] = useState(blog.likes)
  const dispatch = useDispatch()

  const deleteBlog = async (blogToDel) => {
    if (window.confirm(`Remove blog '${blogToDel.title}' by ${blogToDel.author}?`)) {
      const response = await blogService.deleteBlog(blogToDel)
      console.log(response)
      if (response.status === 204) {
        dispatch(removeBlog(blogToDel))
      }
    }
}

  const updateLikes = async () => {
    const likes = like + 1
    const updatedBlog = {...blog, likes}
    const returnedBlog = await blogService.update(updatedBlog)
    console.log(returnedBlog)
    setLikes(returnedBlog.likes)
  }

  const user = useSelector(store => store.user)
  const canRemove = {
    display: (!user || !blog.user || user.username !== blog.user.username)
    ? 'none' : ''
  }//<p>{`added by ${blog.user.username}`}</p>

  return (
    <div>
        <h2>{blog.title} by {blog.author} </h2>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>
          {`likes ${like}`}
          <button onClick={updateLikes}>like</button>
        </p>
        
        <p style={canRemove}>
          <button onClick={deleteBlog}>remove</button>
        </p>
    </div>
  )  
}

const Blogs = () => {
    const blogs = useSelector(store => store.blogs)
    const message = useSelector(store => store.message)
    
    const dispatch = useDispatch()
    if (message) {
        setTimeout(() => {
            dispatch(resetNotification())
        }, 3000)
    }

    return (
        <div>
            <h2>Blogs</h2>
            <TableContainer component={Paper}>    
            <Table>
                <TableBody>
                {blogs.map(blog =>
                <TableRow key={blog.id}>
                    <TableCell>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>by {blog.author}</TableCell>
                </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default Blogs