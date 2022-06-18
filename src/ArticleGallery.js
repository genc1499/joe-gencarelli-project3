import image from "./assets/images.jpg";
import firebase from "./firebase.js";
import {getDatabase, onValue, push, ref, remove} from 'firebase/database';
import {useState, useEffect} from 'react';





const ArticleGallery = (props)=>{
const  [saved, setSaved]=useState({});

  

    const handleClick=(e)=>{
        console.log(e);
        const link= e.target.previousElementSibling.href;
        // image
        const imageSource=e.target.parentElement.previousSibling.firstChild.src;
        // h3
       const articleTitle=e.target.parentElement.previousSibling.previousSibling.innerText;
        const database=getDatabase(firebase);
        const dbRef=ref(database);
        const articleObject={
            title:articleTitle,
            url:link,
            imageSrc:imageSource,
            key:articleTitle
            
            
           
        }
        setSaved(articleObject);
        push(dbRef, articleObject);
        
    }
   
    
    
    return(
        <section>
            < div className="wrapper">
                <ul className = "article-list">
                    {
                        props.article.map((item, index)=>{
                    
                            return(
                            <li key={item.publishedAt}>
                                <h3>{item.title}</h3>
                                <div className="image-container">

                                    {/* If there is no image, add a palceholder image from the assets folder */}
                                    {
                                    item.urlToImage
                                    ?
                                    <img src={item.urlToImage} alt={item.title}/>
                                    :
                                    
                                    <img src= {image}/>

                                    }
                                    
                                </div>
                                
                                <div className="read-options">
                                    <a className = "read-me" href={item.url}>Read Now</a>
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