import { Link } from "react-router-dom"

export const ArticleCard = ({article}) => {
    return <li key={article.article_id} className='article-card'>
    <div className='article-title'><Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link></div>
    <p className='article-author'>Author: {article.author}</p>
    <p className='article-date'>Date posted: {article.created_at.substring(11, 16)}, {article.created_at.substring(0, 10)}</p>
    <p className='comment-count'>Comments: {article.comment_count}</p>
    <p className='vote-count'>Votes: {article.votes}</p>
    <p className='topic'>Topic: {(article.topic.slice(0,1)).toUpperCase()}{article.topic.substring(1)}</p>
</li>
}