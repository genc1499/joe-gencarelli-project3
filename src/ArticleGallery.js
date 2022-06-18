import image from "./assets/images.jpg";
import firebase from "./firebase.js";
import {getDatabase, onValue, push, ref, remove} from 'firebase/database';
import {useState, useEffect} from 'react';

const ArticleGallery = (props)=>{
const  [saved, setSaved]=useState({});

  

    const handleClick=(e)=>{
        console.log(e);

        // url property
        const link= e.target.previousElementSibling.href;
        // image property
        const imageSource=e.target.parentElement.previousSibling.firstChild.src;
        // h3 property 
        const articleTitle=e.target.parentElement.previousSibling.previousSibling.innerText;
        const database=getDatabase(firebase);
        const dbRef=ref(database);

        // The opject properties to add to firebase
        const articleObject={
            title:articleTitle,
            url:link,
            imageSrc:imageSource,
        }

        // Set state and push the object
        setSaved(articleObject);
        push(dbRef, articleObject);
        
    }
   
    
    
    return(
        <section>
            < div className="wrapper">
                <h2 className="gallery-heading" >Top Stories</h2>
                <ul className = "article-list">
                    {
                        // map through the props and return the list of articles to be displayed
                        props.article.map((item, index)=>{
                    
                            return(
                            <li key={index}>
                                <h3>{item.title}</h3>
                                <div className="image-container">

                                    {/* If there is no image, add a palceholder image from the assets folder */}
                                    {
                                    item.urlToImage
                                    ?
                                    <a href={item.url}><img src={item.urlToImage} alt={item.title}/></a>
                                    :
                                    
                                    <a href={item.url}><img src={image} alt={item.title}/></a>

                                    }
                                    
                                </div>
                                
                                <div className="read-options">
                                    

                                    {/* This function will handle the click that let's the user add an article to their list */}
                                    <button onClick={handleClick}className= "read-after">Read Later</button>
                                </div>
                            </li>
                            )
                        })
                    }
                        
                </ul>
            </div>
        </section>
    )
}

export default ArticleGallery;