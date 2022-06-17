import {useState, useEffect} from 'react';
const Header = () =>{
    // set state for today's date
    const [date, setdate]= useState (['']);
    const newDate = new Date();

    const month = newDate.toLocaleString("en-US", { month: "short" })
    const day = newDate.getDate();

    // Date should only be rendered once, when the header is mounted
    useEffect(()=>{
        setdate([month,day])
    },[])
    return(
        <header>
            <h1>The <span className="daily-span">Daily</span></h1>
    
            <h3>{date[0]}  <span className="date-span">{date[1]}</span></h3>
        </header>
    )
}

export default Header;