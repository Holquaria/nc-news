import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, getArticles } from '../utils/api'
import { SubNav } from './SubNav'
import { useParams } from 'react-router-dom'
import { Topic404 } from './Topic404'

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [sortBy, setSortBy] = useState('created_at')
    const [sortOrder, setSortOrder] = useState('desc')

    const { topic } = useParams()


    useEffect(() => {
        setLoading(true)
        getArticles(topic, sortBy, sortOrder)
        .then((articles) => {
            setArticles(articles)
            setLoading(false)
        }).catch((err) => {
            setLoading('error')
        })
      }, [topic, sortBy, sortOrder]);

    return  (<div><SubNav sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />{loading === true ? <p>Loading...</p> : loading === 'error' ? <Topic404 /> : 
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
                Votes: {article.votes}
                
            </li>
        })}
    </ul>}</div>)
}