import { Link } from "react-router-dom"

export const Article404 = () => {
    return <div>
        <p>Article not found</p>
        <Link to='/articles'><p>All Articles</p></Link>
    </div>
}