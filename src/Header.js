import image from "./assets/globe-modified.png";
import newspaper from "./assets/newsIcon.png";
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
         
            <div className="header-nav wrapper">
                <nav>
                    <ul>
                     
                     
                        <li> 
                            <Link to = "/myreads" >
                                
                                <div className="link-image">
                                    <img src={newspaper} alt="newspaper icon"/>
                                </div>
                              
                                <div className="total-articles">
                                    {props.itemsInList}
                                </div> 
                                      
                            </Link>  
                           
                        </li>
               
                    </ul>
                 
                </nav>
             
                <div className="heading-container">
                    <h1>Your <span className="daily-span">Extra</span></h1>

                    {/* Render today's date here */}
                    <h2>{date[0]}  <span className="date-span">{date[1]}</span></h2>

                    <div className="earth-image rotate">
                        <img src={image} alt="Cartoon image of Earth"/>
                    </div>
                    
                </div>
            </div>
        </header>
    )
}

export default Header;