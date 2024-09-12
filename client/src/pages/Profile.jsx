import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { Box, Flex, Heading, Text, Container, Button, ButtonGroup, Link } from '@chakra-ui/react';

  const Profile = () => {
  const { username: userParam } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().authenticatedPerson.username === userParam) {
    navigate('/me');
  }

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!user?.username) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Box textAlign="center">
          <Heading size="md" mb={4}>
            You need to be logged in to see this.
          </Heading>
          <Text mb={4}>Use the navigation links above to sign up or log in!</Text>
          <Button as={Link} to="/login" colorScheme="blue">
            Login
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" mb={8}>
      <Box bg="gray.800" color="darkblue" p={6} mb={8} fontFamily = "sans-serif" borderRadius="md">
        <Heading size="lg">
          {userParam ? `${user.username}'s` : 'My'} profile
        </Heading>
      </Box>
{/* Display user's name and email address in a box with a border */}



      <Box color="darkblue" p={6} mb={28} fontFamily = "sans-serif" borderRadius="md" borderWidth={5} borderStyle="solid" borderColor="darkblue" >
        <Text fontSize="xl" fontWeight="bold" display="flex" justifyContent="center" > {user.username} </Text>
        
        <Text fontSize="md" fontWeight="bold"> {user.email} </Text>
      </Box>

      <Box mb={8}>
        <Heading size="md" mb={4}>
          {userParam ? `${user.username}'s` : 'My'} Previous Thoughts
        </Heading></Box>
      <Box mb={8}>
        
        <ThoughtList
          thoughts={user.thoughts}
          title={`${user.username}'s thoughts...`}
          showTitle={false}
          showUsername={false}
        />
      </Box>

      {!userParam && (
        <Box mb={6} p={6} borderWidth={1} borderStyle="dotted" borderColor="gray.500" borderRadius="md">
          <ThoughtForm />
        </Box>
      )}
    </Flex>
  );
};

export default Profile;
