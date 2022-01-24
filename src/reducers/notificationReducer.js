import { useDispatch } from "react-redux"


const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'NEW_NOTIF':
            return action.data
        case 'RESET':
            return null
        default:
            return state
    }
}

export const newNotification = (message) => {
    return {
        type: "NEW_NOTIF",
        data: message
    }
}

export const resetNotification = () => {
    return {
        type: "RESET"
    }
}


export default notificationReducer