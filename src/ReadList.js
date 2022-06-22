import firebase from "./firebase";
import {useState, useEffect} from 'react';
import {getDatabase, onValue, ref, remove} from 'firebase/database';
import {Link} from 'react-router-dom';

const ReadList = () =>{

    // State for the articles that will be retrieved from firebase
    const [savedArticles, setSavedArticles] = useState(['']);
   
    useEffect(() => {
  
        const database = getDatabase(firebase)
        const dbRef = ref(database)
        
    
        // use the OnValue to return what objects are stored in the database currently
        onValue(dbRef, (response) => {

            //Store the response object from OnValue in a variable 
            const data=response.val();
        
            // Empty array which will store all the articles as objects
            const list = [];

            // Using a for in loop:
            // push the object properties + the key property (equal to the object's firebase code)
            for(let article in data){
        
                const articleObject = {key:article, title:data[article].title, url:data[article].url, imageSrc:data[article].imageSrc}
          
                // Push articles to array
                list.push(articleObject);
              
                }
                
            // Set state for the objects stored in firebase, which will be mapped over below for rendering
            setSavedArticles(list);
           
           
        })
  
    }, [])

   
    // Remove the article from the read list - on the user's click
    const handleRemove = (id)=>{
        const database=getDatabase(firebase);
        const dbRef = ref (database, `${id}`);
        remove(dbRef);
    }
    
   return(
       
        <section>
           
            <div className = "wrapper">

                {/* Link back to home  page */}
                <h3 className= "back-to-news"> <Link to ="/" >Back to News</Link></h3>

                <ul className = "article-list">
                    {

                    // Check if any articles have been added
                    // If not, display message below

                      savedArticles.length===0?
                      <h3 className="empty-list-heading">Nothing here yet!</h3>
                      :
                        // Map through the state of articles saved and return them for rendering
                        savedArticles.map((item, index)=>{
                            return(
                                
                                // Disclaimer: using a different value for key has consistently thrown me erros with no resolution. Although not my first choice, index will be used as the key value (shrug emoji)

                                <li key={index}>
                                   
                                    <h3 >{item.title}</h3>
                                    <div className="image-container">
                                        <a href={item.url}><img src={item.imageSrc} alt={item.title}/></a> 
                                    </div>
                                    <div className="read-options">
                                        {/* HandleRemove function will allow the user to remove whatever articles they wish to, stored in their list */}
                                        <button onClick={ ()=>handleRemove(item.key)}className= "read-after">Remove</button>
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

export default ReadList;