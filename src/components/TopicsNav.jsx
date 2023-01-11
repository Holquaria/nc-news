import { useEffect, useState } from "react"
import { getTopics } from "../utils/api"
import { Link } from "react-router-dom"

export const TopicsNav = () => {
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
        return <ul className="topics-nav">{topics.map((topic) => {
            return <li key={topic.slug}><Link to={`/topics/${topic.slug}/articles`}><p className="topic-link">{(topic.slug.slice(0,1)).toUpperCase()}{topic.slug.substring(1)}</p></Link></li>
        })
    }</ul>
    }
}