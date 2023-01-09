import { useState, useEffect } from 'react'
import axios from 'axios'

const newsAPI = axios.create({
    baseURL: "https://news-query-service.onrender.com/api",
  });

export const Articles = () => {
    const [articles, setArticles] = useState([])

    
    const getArticles = () => {
        return newsAPI.get('/articles')
        .then(({data}) => {
            console.log(data.articles[0])
            setArticles(data.articles)
        }).catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
       getArticles()
      }, []);

    return <ul className='article-container'>
        {articles.map((article) => {
            return <li key={article.article_id} className='article-card'>
                <h3 className='article-title'>{article.title}</h3>
                <p>Author: {article.author}
                <br />
                Date posted: {article.created_at.substring(11, 16)}, {article.created_at.substring(0, 10)}
                <br />
                Topic: {(article.topic.slice(0,1)).toUpperCase()}{article.topic.substring(1)}</p>
            </li>
        })}
    </ul>
}