import firebase from "./firebase";
import {useState, useEffect} from 'react';
import {getDatabase, onValue, ref} from 'firebase/database';

// This component is used to keep track of the number of articles stored in firebase
 const TotalArticle =(props)=>{

    // State for keeping track of the number of articles in the user's read list
    const [totalArticles, setTotalArticles]=useState("");

    // useEffect for when the number of articles change in firebase
    useEffect(() => {
  
        const database = getDatabase(firebase)
        const dbRef = ref(database)
        
   
        // use the OnValue to return what objects are stored in the database currently
        onValue(dbRef, (response) => {
  
            //Store the response object from OnValue in a variable 
            const data=response.val();
         
            // Variable to Keep track of total amount of articles in state
            let count=0;
  
  
            // Using a for in loop:
            // push the object properties + the key property (equal to the object's firebase code)
            for(let article in data){
         
                count+=1;
             
            }
          
            // Set state for the objects stored in firebase, which will be mapped over below for rendering
          
            setTotalArticles(count)
          
        })

         //Pass the totalArticles state to app.js to render the current number of articles in the readlist
         props.passTotal(totalArticles);
        
    }, [totalArticles])
    
  
   
  
 }

 export default TotalArticle;