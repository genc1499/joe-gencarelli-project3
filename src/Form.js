import {useState} from "react";

const Form = (props)=>{

    // set state for the user's input
    const [userInput, setUserInput]=useState('');

    // set state for the user's keyword search 
    const [keyWord, setKeyWord] = useState ('');

    // function that will handle the click event and set state for the user's input
    const handleClick = (e)=>{
        e.preventDefault();
        setUserInput(e.target.value);
        props.passClick(userInput);
    }

    // Function that will get the user's query and set the state of keyword with that query
    const handleChange=(e)=>{
        e.preventDefault();
        const querySearch =e.target.value;
        setKeyWord(querySearch);
        
    }

    // Function that will take the user's query and set the userInput state, passing this value to the passWord function in App.js
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(keyWord!==""){
            setUserInput(keyWord);
            props.passWord(userInput);
           
        }
        else{
            // Error handling when the user submits with no query
            alert("Please enter something to search!");
        }    
        setKeyWord("");
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

                <label for='query'></label>
                <input onChange = {handleChange} value={keyWord} type='text' placeholder=" 'internet explorer' " id="query"/>
                <button  className="search-button">Search</button>
             
            </form>
        </div>
    )
}

export default Form;