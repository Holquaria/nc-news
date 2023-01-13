import { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { updateArticleVotes } from "../utils/api";

export const VoteBlock = ({ votes, article_id }) => {
    const { user } = useContext(UserContext)
  const [voteCount, setVoteCount] = useState(votes);
  const [voted, setVoted] = useState();
  const [voteDirection, setVoteDirection] = useState("");
  const [error, setError] = useState(false)

  const vote = (vote) => {
    if (vote === "up") {
      setVoteCount((currCount) => {
        return (currCount += 1);
      });
      setVoteDirection("up");
      setVoted(true);
      updateArticleVotes(1, article_id).then(() => {
        setError(false)
      }).catch(() => {
        setError(true)
        setVoted(false)
        setVoteCount((currCount) => {
          return (currCount -= 1);
        });
      });
    } else if (vote === "down") {
      setVoteCount((currCount) => {
        return (currCount -= 1);
      });
      setVoteDirection("down");
      setVoted(true);
      updateArticleVotes(-1, article_id).then(() => {
        setError(false)
      }).catch(() => {
        setError(true)
        setVoted(false)
        setVoteCount((currCount) => {
          return (currCount += 1);
        });
      });
    } else if (vote === "undo") {
      if (voteDirection === "up") {
        setVoteCount((currCount) => {
            return (currCount -= 1);
          });
        setVoted(false)
        setVoteDirection('')
        updateArticleVotes(-1, article_id).then(() => {
            setError(false)
          }).catch(() => {
            setError(true)
            setVoted(true)
            setVoteDirection('up')
          setVoteCount((currCount) => {
            return (currCount += 1);
          });
        });
      } else if (voteDirection === "down") {
        setVoteCount((currCount) => {
            return (currCount += 1);
          });
        setVoted(false)
        setVoteDirection('')
        updateArticleVotes(+1, article_id).then(() => {
            setError(false)
          }).catch(() => {
            setError(true)
            setVoted(true)
            setVoteDirection('down')
          setVoteCount((currCount) => {
            return (currCount -= 1);
          });
        });
      }
    }
  };

  if (user !== null) {
    return (
      <div className="vote-block">
        <p className="votes">Did you like this article?</p>
        <button
          className="vote-up"
          disabled={voted === true}
          onClick={() => {
            vote("up");
          }}
        >
          ↑
        </button>
        <button
          className="vote-down"
          disabled={voted === true}
          onClick={() => {
            vote("down");
          }}
        >
          ↓
        </button>
        <p className="votes">{voteCount}</p>
        {voteDirection === "" ? error === true ? <p className="voting-error">Something went wrong</p> : null : error === true ? <p className="voting-error">Something went wrong</p> : (
          <button
            onClick={() => {
              vote("undo");
            }}
          >
            Undo
          </button>
        )}
        {}
      </div>
    );
  } else
    return (
      <div className="vote-block">
        <p className="login-placeholder">Please log in to vote</p>
      </div>
    );
};
