import './App.css';
import Header from "./Header.js";
import Form from "./Form.js";
import ArticleGallery from "./ArticleGallery";
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  // Set state for the articles returned from the API call
  const [articles, setArticles] = useState (['']);

  // Set state for the users parameters, which dictate which category of article to render 
  const [userParam, setUserParam] = useState([""]);
  // Axios call will only be made if the user selects a category of news 

  useEffect(()=>{
    axios({  
      url:'https://newsapi.org/v2/top-headlines',
      params:{
        apiKey:`3363e4832d3b405bb63c8f7d36bed089`,
        country:'us',
        category:'top'
        
      }
    })
    .then((response)=>{
      setArticles(response.data.articles);
      console.log(response.data.articles);
    })

  },[])
  
  
  useEffect(()=>{
    if(userParam[1]===false)
    {
      axios({  
        url:'https://newsapi.org/v2/top-headlines',
        params:{
          apiKey:`3363e4832d3b405bb63c8f7d36bed089`,
          country:'us',
          category:userParam[0]
        }
      })
      .then((response)=>{
        setArticles(response.data.articles);
        console.log(response.data.articles);
      })
    }

    else{
      axios({  
        url:'https://newsapi.org/v2/everything',
        params:{
          apiKey:`3363e4832d3b405bb63c8f7d36bed089`,
          country:'us',
          q:userParam[0],
          sortBy: 'publishedAt',
          language:"en"

        }
      })
      .then((response)=>{
        setArticles(response.data.articles);
        console.log(response.data.articles);
      })
    }

    
  },[userParam])
  
  

  // Function that will set the paramters using the user's input set in state in the form component

  const getParameters = (param) =>{
    setUserParam(param);
    console.log(param);
  }



  return (
    <>
    <Header/>
    <Form passClick={getParameters}/>
    <ArticleGallery article= {articles} />
    </>
  );
}

export default App;
