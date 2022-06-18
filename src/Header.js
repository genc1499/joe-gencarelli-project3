import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
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
            <div className="header-nav wrapper">
                <nav>
                    <ul>
                        <li>
                        <Link to = "/read-list">MyReads</Link>
                        </li>
                        <li>
                        <Link to = "/home">Home</Link>
                        </li>
                    </ul>
                </nav>
                <div className="heading-container">
                    <h1>The <span className="daily-span">Daily</span></h1>
                    <h2>{date[0]}  <span className="date-span">{date[1]}</span></h2>
                </div>
            </div>
        </header>
    )
}

export default Header;