import { Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react'; 

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
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
                <Box color = "white">
                  <span style = {{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                </Box>
                </>
              )}
            </h4>
            <Box bg = "yellow" color = "darkblue">
              <p>{thought.thoughtText}</p>
            </Box>
            <Box bg = "darkblue" mb = "10px">
            <Link to={`/thoughts/${thought._id}`}>
             <Text color = "white"> Join the discussion on this thought. </Text>
            </Link>
            </Box>
          </Box>
        ))}
    </Box>
  
  );
};

export default ThoughtList;
