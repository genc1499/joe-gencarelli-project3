import image from "./assets/images.jpg";
import firebase from "./firebase.js";
import {getDatabase, push, ref} from 'firebase/database';
import {useState} from 'react';


const ArticleGallery = (props)=>{
const  [saved, setSaved]=useState({});

    // Function to handle the click event and retrieve the properties for image, url and title
    const handleClick=(e)=>{
    
        // Image Source
        const source =e.target.parentElement.previousSibling.firstChild.innerHTML;

        //Slice image source to isolate the url
        const newSource = source.slice(
        source.indexOf('=') + 2,
        source.lastIndexOf('alt')- 2,);

         // url property  
        const link= e.target.parentElement.previousSibling.firstChild.href;
      
        // h3 property 
        const articleTitle=e.target.parentElement.previousSibling.previousSibling.innerText;
        const database=getDatabase(firebase);
        const dbRef=ref(database);

        // The object properties to add to firebase
        const articleObject={
            title:articleTitle,
            url:link,
            imageSrc:newSource
        }
   
        // Set state and push to firebase
        setSaved(articleObject);
        push(dbRef, saved);

     
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

                                 // Disclaimer: using a different value for key has consistently thrown me erros with no resolution. Although not my first choice, index will be used as the key value (shrug emoji)

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