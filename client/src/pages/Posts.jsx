import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query {
    posts {
      _id
      title
      content
      user {
        username
      }
      createdAt
    }
  }
`;

const Posts = () => {
  const { loading, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {data.posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>by {post.user.username} on {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
