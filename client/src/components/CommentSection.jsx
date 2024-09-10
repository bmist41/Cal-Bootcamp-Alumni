import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../graphql/mutations';

const CommentSection = ({ postId, comments }) => {
  const [content, setContent] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({ variables: { postId, content } });
      setContent('');
      window.location.reload();  // Reload the page to show new comments
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
//return the following
  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>by {comment.user.username} on {new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
