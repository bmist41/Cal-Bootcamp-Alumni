import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPost] = useMutation(CREATE_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ variables: { title, content } });
      setTitle('');
      setContent('');
      window.location.reload();  // Reload the page to show new posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
