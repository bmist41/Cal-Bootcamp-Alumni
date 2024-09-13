import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@chakra-ui/react'; 

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const UPDATE_THOUGHT = gql`
  mutation updateThought($thoughtId: ID!, $thoughtText: String!) {
    updateThought(thoughtId: $thoughtId, thoughtText: $thoughtText) {
      _id
      thoughtText
    }
  }
`;


const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [isEditing, setIsEditing] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [updateThought] = useMutation(UPDATE_THOUGHT);

  const handleEditClick = (thought) => {
    setIsEditing(thought._id);
    setUpdatedText(thought.thoughtText);
  };

  const handleSaveClick = async (thoughtId) => {
    try {
      await updateThought({
        variables: { thoughtId, thoughtText: updatedText },
      });
      setIsEditing(null); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating thought:', error);
    }
  };

  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
     <Box bg = "white" m = "10px" p = "10px">
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <Box key={thought._id} bg = "darkblue">
            <h4 bg = "gray">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              {isEditing === thought._id ? (
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
              ) : (
                <p>{thought.thoughtText}</p>
              )}
            </div>
            <div className="card-body">
              {isEditing === thought._id ? (
                <button
                  className="btn btn-success"
                  onClick={() => handleSaveClick(thought._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEditClick(thought)}
                >
                  Update
                </button>
              )}
            </div>
            <Box bg = "dark gray" mb = "10px">
            <Link to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this thought.
            </Link>
            </Box>
          </Box>
        ))}
    </Box>
  
  );
};

export default ThoughtList;

