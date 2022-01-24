import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from '../services/blogs'
import { newBlog } from "../reducers/blogReducer";
import { newNotification, resetNotification } from "../reducers/notificationReducer";
import {Button, TextField} from '@material-ui/core'


const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

    //addBlog will add successfully added blog to our blogs state
    const addBlog = (blog) => {
      dispatch(newBlog(blog))
      dispatch(newNotification({
        type: "success",message: `${user.name} posted ${blog.title}`
      }))
      setTimeout(() => dispatch(resetNotification()), 3000)
    }

    const submitBlog = async (event) => {
        event.preventDefault()
        const blog = {
          title,
          author,
          url
        }
        const returnedBlog = await blogService.create(blog)
        console.log(returnedBlog)

        addBlog(returnedBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={submitBlog}>
          <div>
            <TextField label="title" value={title} onChange={({target}) => setTitle(target.value)}/>
          </div>
          <div>
            <TextField label="author" value={author} onChange={({target}) => setAuthor(target.value)}/>
          </div>
          <div>
            <TextField label="title" value={url} onChange={({target}) => setUrl(target.value)}/>
          </div><br />
          <Button variant="contained" color="primary" type="submit">create</Button>
        </form>
      </div>
    )
}

export default BlogForm