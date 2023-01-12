import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, getArticles } from '../utils/api'
import { SubNav } from './SubNav'
import { useParams } from 'react-router-dom'

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

    return  (<div><SubNav sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />{loading === true ? <p>Loading...</p> : loading === 'error' ? <p>Something went wrong, please try again</p> : 
    <ul className='article-container'>
        {articles.map((article) => {
            return <li key={article.article_id} className='article-card'>
                <div className='article-title'><Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link></div>
                <p className='article-author'>Author: {article.author}</p>
                <p className='article-date'>Date posted: {article.created_at.substring(11, 16)}, {article.created_at.substring(0, 10)}</p>
                <p className='comment-count'>Comments: {article.comment_count}</p>
                <p className='vote-count'>Votes: {article.votes}</p>
                <p className='topic'>Topic: {(article.topic.slice(0,1)).toUpperCase()}{article.topic.substring(1)}</p>
            </li>
        })}
    </ul>}</div>)
}