import firebase from "./firebase";
import {useState, useEffect} from 'react';
import {getDatabase, onValue, ref, remove} from 'firebase/database';


const ReadList = (props) =>{

    // State for the articles that will be retrieved from firebase
    const [savedArticles, setSavedArticles] = useState(['']);

    // Keep track of how many articles are in state, stored in firebase
    const [articleCount, setArticleCount]= useState ('');

    useEffect(() => {
  
      const database = getDatabase(firebase)
      const dbRef = ref(database)
      
 
      // use the OnValue to return what objects are stored in the database currently
      onValue(dbRef, (response) => {

        //Store the response object from OnValue in a variable 
        const data=response.val();
       
        // Empty array which will store all the articles as objects
        const list = [];

        // Variable to Keep track of total amount of articles in state
        let count=0;


        // Using a for in loop:
        // push the object properties + the key property (equal to the object's firebase code)
        for(let article in data){
            const ob = {key:article, title:data[article].title, url:data[article].url, imageSrc:data[article].imageSrc}
            count+=1;
            // push each object to the 'list' array
            list.push(ob);
            
            }
        
        // Set state for the objects stored in firebase, which will be mapped over below for rendering
        props.passTotal(count);
        setSavedArticles(list);
        
        setArticleCount(count);
        console.log(count);
        console.log(list);
      })
    }, [])
    console.log({savedArticles});
        // Remove the article from the read list - on the user's click
        const handleRemove = (id)=>{
        const database=getDatabase(firebase);
        const dbRef = ref (database, `${id}`);
        console.log(id);
        remove(dbRef);
        }
    

    
   return(
       
        <section>
           
            <div className = "wrapper">
                <h2 className="gallery-heading">Your Read List</h2>
                <ul className = "article-list">
                    {
                        // Map through the state of articles saved and return them for rendering
                        savedArticles.map((item, index)=>{
                            return(
                            
                                <li key={item.key}>
                                    {
                                        console.log("this key", item.key)
                                    }
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