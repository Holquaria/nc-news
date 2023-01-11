import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, getArticles } from '../utils/api'
import { TopicsNav } from './TopicsNav'
import { useParams } from 'react-router-dom'

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    const { topic } = useParams()


    useEffect(() => {
        setLoading(true)
        getArticles(topic)
        .then((articles) => {
            setArticles(articles)
            setLoading(false)
        }).catch((err) => {
            setLoading('error')
        })
      }, [topic]);

    return  (<div><TopicsNav />{loading === true ? <p>Loading...</p> : loading === 'error' ? <p>Something went wrong, please try again</p> : 
    <ul className='article-container'>
        {articles.map((article) => {
            return <li key={article.article_id} className='article-card'>
                <Link to={`/articles/${article.article_id}`}><h3 className='article-title'>{article.title}</h3></Link>
                <p>Author: {article.author}
                <br />
                Date posted: {article.created_at.substring(11, 16)}, {article.created_at.substring(0, 10)}
                <br />
                Topic: {(article.topic.slice(0,1)).toUpperCase()}{article.topic.substring(1)}
                <br />
                Comments: {article.comment_count}</p>
                
            </li>
        })}
    </ul>}</div>)
}