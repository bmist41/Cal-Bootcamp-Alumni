// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Text } from '@chakra-ui/react';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <Box fontFamily = "sans-serif"  m = "10px" borderStyle = "solid" bg = "gold">
      <Text>
        {thought.thoughtAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {thought.createdAt}
        </span>
      </Text>
      <Box bg = "dark">
      <Text>
        <blockquote
          className="p-4"
          style={{
            background: 'darkblue',
            fontSize: '1.5rem',
            color: "white",
            border: '2px solid',
            lineHeight: '1.5',
          }}
        >
          {thought.thoughtText}
        </blockquote>
      </Text>
      </Box>
      </Box>
      <Text>
        <CommentList comments={thought.comments} />
      </Text>
      <Text style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </Text>
      </>
  );
};

export default SingleThought;
