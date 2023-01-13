import { CommentCard } from "./CommentCard";

export const CommentArray = ({ comments, setCommentRemoved }) => {
  return (
    <ul>
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </ul>
  );
};
