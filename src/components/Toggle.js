import React, {useState} from "react";
import {Button} from "@material-ui/core"
const Toggle = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none': ''}
    const showWhenVisible = {display: visible ? '': 'none'}
    //when visibility is true, we will show our child component (BlogForm, etc)
    //When it is false, we show button to expand the child componenet


    const changeVisibility = () => setVisible(!visible)
    
    return (
    <div>
        <div style={hideWhenVisible}>
            <Button variant="contained" color="primary" onClick={changeVisibility}>create new blog</Button>
        </div>
        <div style={showWhenVisible}>      
            {props.children}
            <Button variant="contained" color="secondary" onClick={changeVisibility}>cancel</Button>
        </div>
    </div>
    )
}

export default Toggle