import { useState } from 'react'
import { updateArticleVotes } from '../utils/api'

export const VoteBlock = ({votes, article_id}) => {
    const [voteCount, setVoteCount] = useState(votes)

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
        .then(() => {})
        .catch(() => {
            setVoteCount((currCount) => {
                return currCount += 1
            })
        })
        }
    }

    return <div>
        <button className="vote-up" onClick={() => {vote('up')}}>↑</button>
        <button className="vote-down" onClick={() => {vote('down')}}>↓</button>
        <p>{voteCount}</p>
    </div>
}