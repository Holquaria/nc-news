import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, getArticles } from '../utils/api'
import { SubNav } from './SubNav'
import { useParams } from 'react-router-dom'
import { Topic404 } from './Topic404'
import { ArticleCard } from './ArticleCard'

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
            return <ArticleCard key={article.article_id} article={article} />
        })}
    </ul>}</div>)
}