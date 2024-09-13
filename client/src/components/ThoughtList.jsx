import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from '../utils/mutations';
import { QUERY_THOUGHTS } from '../utils/queries';

const ThoughtList = ({ thoughts, refetch }) => {
  const [removeThought] = useMutation(REMOVE_THOUGHT, {
    refetchQueries: [
      { query: QUERY_THOUGHTS }
    ]
  });

  const handleRemoveClick = async (thoughtId) => {
    try {
      await removeThought({ variables: { thoughtId } });
    } catch (error) {
      console.error('Error removing thought:', error);
    }
  };

  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {thoughts.map((thought) => (
        <div key={thought._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {thought.thoughtAuthor} thought on {thought.createdAt}
          </h4>
          <div className="card-body bg-light p-2">
            <p>{thought.thoughtText}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveClick(thought._id)}
            >
              Remove Thought
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;



