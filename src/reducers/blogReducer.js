import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.id)
        default:
            return state
    }
}


//action creator for initializaing blogs from backend
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const removeBlog = (blog) => {
    return {
        type: 'DELETE_BLOG',
        id: blog.id
    }
}

export const newBlog = (blog) => {
    return {
        type: 'NEW_BLOG',
        data: blog
    }
}

export default blogReducer