import { useEffect, useState } from 'react'
import { updateVotes } from '../utils/api'

export const VoteBlock = ({votes, article_id}) => {
    const [voteCount, setVoteCount] = useState(0)

    const vote = (vote) => {
        if (vote === 'up') {
        setVoteCount((currCount) => {
            return currCount += 1
        })
        updateVotes('up', article_id)
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
        updateVotes('down', article_id)
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
        <p>{votes}</p>
    </div>
}