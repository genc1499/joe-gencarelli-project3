import './App.css';
import Header from "./Header.js";
import Form from "./Form.js";
import ArticleGallery from "./ArticleGallery";
import ReadList from './ReadList.js';
import Footer from './Footer.js';
import axios from 'axios';
import {useState, useEffect} from 'react';
import firebase from "./firebase.js";
import {getDatabase, onValue, ref} from 'firebase/database';
import {Routes, Route} from 'react-router-dom';

function App() {

  // Set state for the articles returned from the API call
  const [articles, setArticles] = useState (['']);

  // Set state for the user's parameters, which dictate the category of article to render 
  const [userParam, setUserParam] = useState(['']);


  // Set State for total number of articles saved in read list
  const [totalArticles, setTotalArticles]=useState("");

  // State that will render number of articles in newspaper icon ('shopping cart')
  const [displayNumber, setDisplayNumber]= useState(false);


//useEffect for when the user makes a selection triggering the paramters state to change
  useEffect(()=>{

    // This axios call will return articles based off the user's selected category
      axios({  
        url:`https://api.currentsapi.services/v1/latest-news`,
        params:{
            apiKey:`WYB2g_IF3u2aTOW2WjDYQeTFuJl84VJ04t4jq7941IFdVNfv`,
            language:'en',
            category:userParam,
            country:"ca"
        }
      })

      .then((response)=>{  
      setArticles(response.data.news);
       
      })
     .catch(error => {
        alert("No articles here!");
     })
    
},[userParam])

// Set state for the number of articles in the user's read list, dependant on the state change in ArticleGallery when the user selects an article to save
useEffect(() => {
  
  const database = getDatabase(firebase)
  const dbRef = ref(database)
  

  // use the OnValue to return what objects are stored in the database currently
  onValue(dbRef, (response) => {
    
      //Store the response object from OnValue in a variable 
      const data=response.val();
   
      // Variable to Keep track of total amount of articles in state
      let count=0;

      // Using a for in loop, count the number of articles
      for(let article in data){
       
          count+=1;
      
       
      }
    
      // Set state for the objects stored in firebase, which will be mapped over below for rendering
      setTotalArticles(count)
  
  })

 
},[displayNumber])

  // Function that will set the paramters state using the user's input set in state in the form component
  const getParameters = (param) =>{
    setUserParam(param);
  }


//  State from ArticleGallery.js that tracks changes in the number of articles saved in read list
  const getTotalArticles = () =>{

    setDisplayNumber(!displayNumber);

  }

  return (
    <>
    
    <Routes>
      {/* Route that renders the header, article gallery and footer */}
      <Route path ="/" element = {
        <> <Header itemsInList={totalArticles}/> 
        <Form passClick={getParameters}/> 
        <ArticleGallery article={articles} getArticleNumber={getTotalArticles}  /> 
    
        <Footer/> </> }/>

      {/* Route that renders the header, readlist and footer */}
      <Route path ="/myreads" element=
        {<><Header itemsInList={totalArticles}/> 
        <ReadList /> 
        <Footer/></> }/> 
        
    </Routes>
      
    </>
  );
}

export default App;
