import React, { useState, useEffect } from 'react'
import { Carousel, Card, Skeleton } from 'antd'
import axios from 'axios'

const NewsSlider = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get("http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=c46146c887334890adeb9cb109f31586")
            .then((res) => {
                setNews(res.data?.articles.filter((article) => article.urlToImage!==null))
            })
            .catch((err) => console.log(err)).finally(() => setLoading(false))
    }, [])

  
    const renderNewsSlides = () => {
        return news.map((article, index) => (
            <div key={index} className='news-container'>
                <a
                    href={article?.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='news-content'>
                    <img
                        src={article?.urlToImage}
                        alt={article?.title}
                        className='news-image'
                    />
                    <div className='news-details'>
                        <h2>{article.title}</h2>

                        <h3>{article.description} <a>continue reading..</a></h3> 
                        {article.author && <h3 className='author'>{article.author}</h3>}
                    </div>
                </a>
            </div>
        ))
    }

    return (
        <Card title='Medical News Updates' className='news-slider' >
           { loading?
            <Skeleton active />:
            <Carousel autoplay>{renderNewsSlides()}</Carousel>}
        </Card>
    )
}

export default NewsSlider
