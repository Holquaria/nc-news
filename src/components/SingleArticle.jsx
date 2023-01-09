import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../utils/api'

export const SingleArticle = () => {
    const [article, setArticle] = useState([])

    const { article_id } = useParams()

    const getArticle = () => {
        return api.get(`/articles/${article_id}`)
        .then(({data}) => {
            setArticle(data.article)
        }).catch((err) => {
        })
    }


    useEffect(() => {
       getArticle()
      }, []);

      return <div>
        <h3 className='headline'>{article.title}</h3>
        <h4>By {article.author}</h4>
        <p className='article-body'>{article.body}</p>
      </div>

}