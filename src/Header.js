import image from "./assets/earth-modified.png";
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
const Header = (props) =>{
    // set state for today's date
    const [date, setdate]= useState (['']);

    // Get todays date
    const newDate = new Date();

    // Get month and day from new Date
    const month = newDate.toLocaleString("en-US", { month: "short" })
    const day = newDate.getDate();

    // Date should only be rendered once, when the header is mounted
    useEffect(()=>{
        setdate([month,day])
    },[])

    return(
   
        <header>
            {
                <div className="close"></div>
            }
            <div className="header-nav wrapper">
                <nav>
                    <ul>
                        <li> My <span className="nav-span">reads</span>
                            <div className="total-articles">
                                {props.itemsInList}
                            </div>
                        </li>
                   
                    </ul>
                </nav>
                <div className="heading-container">
                    <h1>The <span className="daily-span">Daily</span></h1>
                    <h2>{date[0]}  <span className="date-span">{date[1]}</span></h2>
                    <div className="earth-image">
                        <img src={image} alt="Cartoon image of Earth"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;