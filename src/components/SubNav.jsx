import { useEffect, useState } from "react"
import { getTopics } from "../utils/api"
import { Link } from "react-router-dom"

export const SubNav = ({sortBy, setSortBy, sortOrder, setSortOrder}) => {
    const [topics, setTopics] = useState([])
    const [err, setErr] = useState(null)

    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics)
        }).catch(() => {
            setErr(true)
        })
    }, [])

    if (err) {
        return <p color="red">Something went wrong</p>
    }

    else {
        return <div className="sub-nav"><ul className="topics-nav">{topics.map((topic) => {
            return <li key={topic.slug}><Link to={`/topics/${topic.slug}/articles`}><p className="topic-link">{(topic.slug.slice(0,1)).toUpperCase()}{topic.slug.substring(1)}</p></Link></li>
        })
    }</ul>
    <select className="sort-selector" value={sortBy} onChange={(e) => {setSortBy(e.target.value)}} >
        <option value='created_at'>Date created</option>
        <option value='author'>Author</option>
        <option value='title'>Title</option>
        <option value='votes'>Votes</option>
        </select>
        <select className="sort-selector" value={sortOrder} onChange={(e) => {setSortOrder(e.target.value)}} >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
            </select> </div>
    }
}