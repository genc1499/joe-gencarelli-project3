import firebase from "./firebase";
import {useState, useEffect} from 'react';
import {getDatabase, onValue, ref, remove} from 'firebase/database';




const ReadList = () =>{
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
            const ob = {key:article, title:article.title, url:article.url, imageSrc:article.imageSource }
            // push each object to the 'list' array
            list.push(ob);
        }
        // Set state for the objects stored in the firebase, which will be mapped over below for rendering
        setSavedArticles(list);
      })
    }, [])
    const handleRemove = (id)=>{
  
        // Remove the article from the read list - nased on the user's click
        const database=getDatabase(firebase);
        const dbRef = ref (database, `${id}`);
        console.log(id);
        remove(dbRef);

    }

    
   return(
        <section>
            <div className = "wrapper">
                <h2>Your Read List</h2>
                <ul className = "article-list">
                    {
                        // Map through the state of articles saved and return them for rendering
                        savedArticles.map((item, index)=>{
                    return(
                    <li key={item.key}>
                        <h3>{item.title}</h3>
                        <div className="image-container">
                            <img src={item.imageSrc}/>
                        </div>
                        <div className="read-options">
                            <a href={item.url}>Read Me</a>

                            {/* HandleRemove function will allow the user to remove whatever articles they wish to, stored in their list */}
                            <button onClick={ (e)=>handleRemove(item.key)}className= "read-after">Remove</button>
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