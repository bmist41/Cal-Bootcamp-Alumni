import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ME = gql`
  query {
    me {
      username
      email
      profile {
        linkedin
        github
        bio
        bootcampClass
        firstJobPath
      }
      posts {
        title
        content
      }
    }
  }
`;

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;

  const { username, email, profile, posts } = data.me;

  return (
    <div>
      <h2>{username}'s Profile</h2>
      <p>Email: {email}</p>
      <h3>Profile Details</h3>
      <p>LinkedIn: {profile.linkedin}</p>
      <p>GitHub: {profile.github}</p>
      <p>Bio: {profile.bio}</p>
      <p>Bootcamp Class: {profile.bootcampClass}</p>
      <p>First Job Path: {profile.firstJobPath}</p>
      <h3>My Posts</h3>
      {posts.map((post, index) => (
        <div key={index}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
