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

                                    {
                                    item.urlToImage
                                    ?
                                    <img src={item.urlToImage}/>
                                    :
                                    
                                    <img src= "./assets/images.jpg"/>

                                    }
                                    
                        
                                </div>
                                <a href={item.url}>Read Me</a>
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