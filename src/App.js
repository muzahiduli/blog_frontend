import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import userService from './services/users'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { Blog } from './components/Blogs'


import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, logUser, newUser } from './reducers/userReducer'

import {BrowserRouter as Router,
  Switch, Route, Link, Redirect, useParams
} from "react-router-dom"

import {Container, AppBar, Toolbar, Button,
Table, TableHead, TableBody, TableRow, TableContainer,
TableCell} from '@material-ui/core'

const Login = () => {
  return (
    <div>
      <div>
        <LoginForm/>
      </div>
    </div>
  )
}


const User = ({users}) => {
  const id = useParams().id
  const user = users.find(user => user.id === id)
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>)}
      </ul>
    </div>
  )
}

const Users = ({users}) => {
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell><strong>blogs created</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => 
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )

}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(initializeBlogs()) 
    userService.getAll().then(users => setUsers(users))
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(logUser(user))
      blogService.setToken(user.token)
    }
  }, [])



  //wrapper function that puts the BlogForm child into Toggle component
  const createBlog = () => {
    return (
      <Toggle buttonLabel="blog">
        <BlogForm/>
      </Toggle>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    dispatch(logoutUser())
    blogService.setToken(null)
  }


  const toShow = () => {
    if (user === null) {
      return (
        <div>
          <Login />
        </div>
      )
    }
    return (
      <div>
        <h2>blogs</h2>
      </div>
    )
  }

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <strong>{user ? `${user.name} is logged in` : ''}</strong>
            {user 
            ? <Button color="inherit" onClick={logout}>logout</Button> 
            : <Button color="inherit" component={Link} to="/login">login</Button>}
          </Toolbar>
        </AppBar>
        <Notification/>

        <Switch>
          <Route path="/users/:id">
            <User users={users}/>
          </Route>
          <Route path="/users">
            {user ? <Users users={users}/> : <Redirect to="/login"/>}
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            {user ? <Blogs /> : <Redirect to="/login"/>}
            {user && createBlog()}
          </Route>
          <Route path="/">
            {!user ? <Login /> : <Redirect to="/blogs"/>}
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App