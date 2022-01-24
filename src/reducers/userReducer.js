import blogService from '../services/blogs'

const userReducer = (state=null, action) => {
    switch (action.type) {
        case 'NEW_USER':
            return action.data
        case 'LOG_USER':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}


export const newUser = (user) => {
    return async dispatch => {
        window.localStorage.setItem('user', JSON.stringify(user))
        dispatch({
            type: 'NEW_USER',
            data: user
        })
    }
}

export const logUser = (user) => {
    return {
        type: 'LOG_USER',
        data: user
    }
}


export const logoutUser = () => {
    return {
        type: 'LOGOUT'
    }
}

export default userReducer