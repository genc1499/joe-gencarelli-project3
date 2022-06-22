import {useState} from "react";

const Form = (props)=>{

    // set state for the user's input (category)
    const [userInput, setUserInput]=useState('');

    // function that will handle the click event and set state for the user's input
    const handleClick = (e)=>{
        e.preventDefault();
        setUserInput(e.target.value);
        props.passClick(userInput);
    }

    return(

        <div className="form-wrapper form-container">

            <form className="categories wrapperForm">
             
                <button className ="form-buttons" value ="business" onClick = {handleClick}>Business</button>
                <button className ="form-buttons" value ="politics" onClick = {handleClick}>Politics</button>
                <button className ="form-buttons" value ="technology" onClick = {handleClick}>Technology</button>
                <button className ="form-buttons" value ="entertainment" onClick = {handleClick}>Entertainment</button>
                <button className ="form-buttons" value ="sports" onClick = {handleClick}>Sports</button>
                <button className ="form-buttons" value ="science" onClick = {handleClick}>Science</button>
                <button className ="form-buttons" value ="art" onClick = {handleClick}>Arts</button>
                <button className ="form-buttons" value ="health" onClick = {handleClick}>Health</button>
            </form>
               
        </div>
    )
}

export default Form;