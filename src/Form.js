import {useState} from "react";

const Form = (props)=>{

    // set state for the user's input
    const [userInput, setUserInput]=useState('top');

    // function that will handle the click event and set state for the user's input

    const handleClick = (e)=>{
        e.preventDefault();
        setUserInput(e.target.value);
        props.passClick(e.target.value);
    }
    return(
        <form>
            <button value ="business" onClick = {handleClick}>Business</button>
            <button value ="politics" onClick = {handleClick}>Politics</button>
            <button value ="technology" onClick = {handleClick}>Technology</button>
            <button value ="entertainment" onClick = {handleClick}>Entertainment</button>
            <button value ="sports" onClick = {handleClick}>Sports</button>
            <button value ="science" onClick = {handleClick}>Science</button>
        </form>
    )
}

export default Form;