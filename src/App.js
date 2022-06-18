import './App.css';
import Header from "./Header.js";
import Form from "./Form.js";
import ArticleGallery from "./ArticleGallery";
import ReadList from './ReadList.js';
import {useState, useEffect} from 'react';
import axios from 'axios';
import firebase from "./firebase.js";
import {getDatabase, onValue, ref} from 'firebase/database';

import {BrowserRouter as Router,Link, Route, Routes} from 'react-router-dom';

function App() {

  // Set state for the articles returned from the API call
  const [articles, setArticles] = useState (['']);

  // Set state for the users parameters, which dictate which category of article to render 
  const [userParam, setUserParam] = useState(['']);

  // Set state for when the user searches by keyword, also sets article state for rendering
  const [keyword, setKeyWord] = useState ('');

  // Set State for total number of articles saved in read list
  const [totalArticles, setTotalArticles]=useState('');

  useEffect(()=>{
    // First axios call will set the top stories as default for when the user arrives
    axios({  
      url:'https://newsapi.org/v2/top-headlines',
      params:{
        apiKey:`3363e4832d3b405bb63c8f7d36bed089`,
        // apiKey:`f0bc24af32704001825c36b936a00399`,
        country:'us',
        category:'top'  
      }
    })
    .then((response)=>{
      setArticles(response.data.articles);
      console.log(response.data.articles);
    })

  },[])
  
// useEffect for when the user makes a selection triggering the paramters state to change
  useEffect(()=>{
    // This axios call will return articles based off the user's selected category
      axios({  
        url:'https://newsapi.org/v2/top-headlines',
        params:{
          apiKey:`3363e4832d3b405bb63c8f7d36bed089`,
          // apiKey:`f0bc24af32704001825c36b936a00399`,
          country:'us',
          category:userParam
        }
      })
      .then((response)=>{
        setArticles(response.data.articles);
        console.log(response.data.articles);
      })
    
},[userParam])

useEffect(()=>{
  // This axios call uses different paramters than category searching
  // This call is made by a change in the keyword state
    axios({  
      url:'https://newsapi.org/v2/everything',
      params:{
        apiKey:`3363e4832d3b405bb63c8f7d36bed089`,
        apiKey:`f0bc24af32704001825c36b936a00399`,
        language:'en',
        q:keyword,
        sortBy:'publishedAt'
      }
    })
    .then((response)=>{
      setArticles(response.data.articles);
      console.log(response.data.articles);
    }) 
    // .catch(error => {
    //   alert("No articles for this search!");
    // })
  
  },[keyword])
  


  // Function that will set the paramters state using the user's input set in state in the form component
  const getParameters = (param) =>{
    setUserParam(param);
  }


  // Function that will set the keyword state using the user's input set in state in the form component
  const getKeyWord = (search) =>{
    setKeyWord(search);  
  }

  // Function that will get the total number of articles in read list from a prop function
  // state props will then be sent to header to render this number

  const getTotalArticles=(total)=>{
    const modTotal = total.toString();
    setTotalArticles(modTotal);
    
  }


  return (
    <>
        {/* State props passed to Header to render total number of articles in read list */}
        <Header itemsInList={totalArticles} />
        {/* Functions passed as props: i. to get the category || ii. to get the query */}
        <Form passClick={getParameters} passWord = {getKeyWord}/>
        {/* Articles in state passed as props to be rendered */}
        <ArticleGallery article={articles}  />
        {/* Prop function that will get the number of articles in read list */}
       <ReadList passTotal = {getTotalArticles}/> 
      
    </>
  );
}

export default App;
