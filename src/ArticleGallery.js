import image from "./assets/images.jpg";



const ArticleGallery = (props)=>{
    return(
        <section>
            < div className="wrapper">
                <ul className = "article-list">
                    {
                        props.article.map((item)=>{
                            return (
                            <li>
                                <h3>{item.title}</h3>
                                <div className="image-container">

                                    {/* If there is no image, add a palceholder image from the assets folder */}
                                    {
                                    item.urlToImage
                                    ?
                                    <img src={item.urlToImage}/>
                                    :
                                    
                                    <img src= {image}/>

                                    }
                                    
                                </div>
                                
                                <div className="read-options">
                                    <a className = "read-me" href={item.url}>Read Now</a>
                                    <button className= "read-after">Read Later</button>
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