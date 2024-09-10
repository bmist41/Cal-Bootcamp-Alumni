import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>by {post.user.username} on {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;