import { useState } from 'react'
import { updateArticleVotes } from '../utils/api'

export const VoteBlock = ({votes, article_id, loggedIn}) => {
    const [voteCount, setVoteCount] = useState(votes)
    const [voted, setVoted] = useState()

    const vote = (vote) => {
        if (vote === 'up') {
        setVoteCount((currCount) => {
            return currCount += 1
        })
        updateArticleVotes(1, article_id)
        .then(() => {})
        .catch(() => {
            setVoteCount((currCount) => {
                return currCount -= 1
            })
        })
        } else if (vote === 'down') {
            setVoteCount((currCount) => {
                return currCount -= 1
            })
        updateArticleVotes(-1, article_id)
        .catch(() => {
            setVoteCount((currCount) => {
                return currCount += 1
            })
        })
        }
        setVoted(true)
    }

    if (loggedIn === true) {
    return <div>
        <button className="vote-up" disabled={voted === true} onClick={() => {vote('up')}}>↑</button>
        <button className="vote-down" disabled={voted === true} onClick={() => {vote('down')}}>↓</button>
        <p>{voteCount}</p>
    </div>
    } else return <p className='login-placeholder'>Please log in to vote</p>
}