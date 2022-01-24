import React from 'react'
import { useState } from 'react'
import { newNotification, resetNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { newUser } from '../reducers/userReducer'
import {TextField, Button} from "@material-ui/core"

import {useHistory} from "react-router-dom"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const login = async (event) => {
        event.preventDefault()
        try {
            const user = await blogService.login({
            username,
            password,
            })
            dispatch(newUser(user))
            dispatch(newNotification({type: "success", message: 'LOGGED IN'}))
            
            
            blogService.setToken(user.token)
            history.push("/blogs")
        } catch (exception) {
            console.log('WRONG LOGIN CREDS  ')
            dispatch(newNotification({type: "error", message: 'WRONG LOGIN CREDS'}))
            setTimeout(() => {
                dispatch(resetNotification())
            }, 3000)
        }
    }

    const handleUsernameChange= (event) => setUsername(event.target.value)
    const handlePasswordChange= (event) => setPassword(event.target.value)

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={login}>
                <div>
                <TextField label="username"  value={username}
                    name="username" onChange={handleUsernameChange}/> 
                </div>
                <div>
                    <TextField label="password"   type="password" value={password}
                    name="password" onChange={handlePasswordChange}/> 
                </div><br />
            <Button variant="contained" type='submit'>login</Button>
            </form>
        </div>
    )
}

export default LoginForm