import { useSelector, useDispatch } from 'react-redux'
import {Alert} from "@material-ui/lab"


const Notification = () => {
    const message = useSelector(store => store.message)

    if (message) {
        const type = message.type === "error" 
        ? "error"
        : "success"
        return (
            <div className={message.type}>
                <Alert severity={type}>
                {message.message}
                </Alert>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Notification