import './App.css';
import Header from "./Header.js";
import Form from "./Form.js";
import ArticleGallery from "./ArticleGallery";
import ReadList from './ReadList.js';
import Footer from './Footer.js';
import {useState, useEffect} from 'react';
import axios from 'axios';
import TotalArticle from './TotalArticle.js';

import {Routes, Route} from 'react-router-dom';

function App() {

  // Set state for the articles returned from the API call
  const [articles, setArticles] = useState (['']);

  // Set state for the users parameters, which dictate which category of article to render 
  const [userParam, setUserParam] = useState(['']);

  // Set state for when the user searches by keyword, also sets article state for rendering
  const [keyword, setKeyWord] = useState ('');

  // Set State for total number of articles saved in read list
  const [totalArticles, setTotalArticles]=useState('');


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
},[userParam])


useEffect(()=>{
  if(keyword!=='')
  {
  // This axios call uses different paramters than category searching
  // This call is made by a change in the keyword state
    axios({  
      url:`https://api.currentsapi.services/v1/search`,
      params:{
        apiKey:`WYB2g_IF3u2aTOW2WjDYQeTFuJl84VJ04t4jq7941IFdVNfv`,
        language:'en',
        keywords:keyword
      
      }
    })
    .then((response)=>{
      setArticles(response.data.news);
    }) 
   
  }
},[keyword])
  


  // Function that will set the paramters state using the user's input set in state in the form component
  const getParameters = (param) =>{
    setUserParam(param);
  }


  // Function that will set the keyword state using the user's input set in state in the form component
  const getKeyWord = (search) =>{
    // Take the first character in the string and capitalize it for this keyword parameter to work
 
    let searchMod=search.toString();
    console.log(searchMod);
    setKeyWord(search);  
  }

  // Function that will get the total number of articles in read list from a prop function
  // state props will then be sent to header to render this number

  const getTotalArticles=(total)=>{

    // Convert total to string so state can set
    const modTotal = total.toString();
    setTotalArticles(modTotal);
    
  }


  return (
    <>
    
    <Routes>
      {/* Route that renders the header, article gallery and footer */}
      <Route path ="/" element = {
        <> <Header itemsInList={totalArticles}/> 
        <Form passClick={getParameters} passWord = {getKeyWord}/> 
        <ArticleGallery article={articles} /> 
        <TotalArticle passTotal = {getTotalArticles} /> 
        <Footer/> </> }/>

      {/* Route that renders the header, readlist and footer */}
      <Route path ="/myreads" element=
        {<><Header itemsInList={totalArticles}/> 
        <ReadList/> 
        <TotalArticle passTotal = {getTotalArticles} />
        <Footer/></> }/> 
        
    </Routes>
      
    </>
  );
}

export default App;
