import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Form = (props)=>{

    // set state for the user's input
    const [userInput, setUserInput]=useState('top');

    // set state for keyword search input
    const [keyWord, setKeyWord] = useState ('');
    // function that will handle the click event and set state for the user's input

    const handleClick = (e)=>{
        e.preventDefault();
        setUserInput(e.target.value);
        props.passClick(userInput);
        console.log(userInput);
    }

    // Function that will get the user's query and set the state of keyword with that query
    const handleChange=(e)=>{
        e.preventDefault();
        console.log(e);
        const querySearch =e.target.value;
        setKeyWord(querySearch);
        console.log(keyWord);
        
    }

    // Function that will take the user's query and set the userInput state, passing this value to the passWord function in App.js
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(keyWord!==""){
        setUserInput(keyWord);
        props.passWord(userInput);
        }
        else{
            alert("Please enter at least one word!");
        }
        
    }

    return(
        <div className="form-wrapper">
            <form onSubmit = {handleSubmit} className="categories wrapperForm">
             
                <button className ="form-buttons" value ="business" onClick = {handleClick}>Business</button>
                <button className ="form-buttons" value ="politics" onClick = {handleClick}>Politics</button>
                <button className ="form-buttons" value ="technology" onClick = {handleClick}>Technology</button>
                <button className ="form-buttons" value ="entertainment" onClick = {handleClick}>Entertainment</button>
                <button className ="form-buttons" value ="sports" onClick = {handleClick}>Sports</button>
                <button className ="form-buttons" value ="science" onClick = {handleClick}>Science</button>
         
                <input onChange = {handleChange} value={keyWord} type='text' placeholder=" 'internet explorer' "/>
                <button  className="search-button">Search</button>
             
            </form>
        </div>
    )
}

export default Form;