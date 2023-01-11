import { useEffect, useState } from "react"
import { getTopics } from "../utils/api"
import { Link } from "react-router-dom"

export const TopicsNav = ({topics, setTopics}) => {

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
        return <ul className="topics-nav">{topics.map((topic) => {
            return <li key={topic.slug}><Link to={`/topics/articles/${topic.slug}`}><p className="topic-link">{(topic.slug.slice(0,1)).toUpperCase()}{topic.slug.substring(1)}</p></Link></li>
        })
    }</ul>
    }
}