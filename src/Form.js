import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Form = (props)=>{

    // set state for the user's input
    const [userInput, setUserInput]=useState(['']);

    // set state for keyword search input
    const [keyWord, setKeyWord] = useState ('');
    // function that will handle the click event and set state for the user's input

    const handleClick = (e)=>{
        e.preventDefault();
        setUserInput(e.target.value, false);
        props.passClick(userInput);
    }

    const handleChange=(e)=>{
        e.preventDefault();
        setKeyWord(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setUserInput(keyWord, true);
        props.passClick(userInput);

    }
    return(
        <form className="categories wrapperForm">
            <button className ="form-buttons" value ="business" onClick = {handleClick}>Business</button>
            <button className ="form-buttons" value ="politics" onClick = {handleClick}>Politics</button>
            <button className ="form-buttons" value ="technology" onClick = {handleClick}>Technology</button>
            <button className ="form-buttons" value ="entertainment" onClick = {handleClick}>Entertainment</button>
            <button className ="form-buttons" value ="sports" onClick = {handleClick}>Sports</button>
            <button className ="form-buttons" value ="science" onClick = {handleClick}>Science</button>
            <input onChange = {handleChange} value={keyWord} type='text' placeholder=" ' internet explorer ' "/>
            <button onSubmit={handleSubmit} className="search-button">Search</button>
        </form>
    )
}

export default Form;