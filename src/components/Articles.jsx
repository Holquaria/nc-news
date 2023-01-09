import { useState, useEffect } from 'react'
import { api } from '../utils/api'

export const Articles = () => {
    const [articles, setArticles] = useState([])

    
    const getArticles = () => {
        return api.get('/articles')
        .then(({data}) => {
            setArticles(data.articles)
        }).catch((err) => {
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