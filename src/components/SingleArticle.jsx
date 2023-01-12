import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api, getArticle } from '../utils/api'
import { Comments } from './Comments'
import { VoteBlock } from './VoteBlock'

export const SingleArticle = ({loggedIn}) => {
    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false)

    const { article_id } = useParams()

    useEffect(() => {
        setLoading(true)
       getArticle(article_id)
       .then((article) => {
        setArticle(article)
        setLoading(false)
       }).catch(() => {
        setLoading('error')
       })
      }, []);

      return (loading === true ? <p>Loading...</p> : loading === 'error' ? <p>Something went wrong, please try again</p> : <div className='single-article'>
        <h3 className='headline'>{article.title}</h3>
        <h4 className='author-tag'>By {article.author}</h4>
        <p className='article-body'>{article.body}</p>
        <VoteBlock votes={article.votes} article_id={article_id} loggedIn={loggedIn}/>
        <Comments loggedIn={loggedIn} />
        </div>
    )
    

}