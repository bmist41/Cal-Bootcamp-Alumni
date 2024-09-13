import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Box, Text, Link } from '@chakra-ui/react';


const UserList = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users.length) {
    return <h4>No users found!</h4>;
  }

  return (
    <Box>
      <h2>All User Profiles</h2>
      <Box display = "flex" flexWrap = "wrap" flexDirection="row" justifyContent="space-around">
        {users.map((user) => (
          
          <Box bg = "darkblue" color = "white" key={user._id} className="card col-12 col-md-3 m-3 p-3">
            <h4 className="card-header bg-primary text-light p-2">
              <Link className="text-light" to={`/profiles/${user.username}`}>{user.username}</Link>
            </h4>
            <Box p={4} borderWidth={1} borderRadius="md">
  <Text mb={2}>
    <strong>Email:</strong>{' '}
    <Link href={`mailto:${user.email}`} color="blue.500">
      {user.email}
    </Link>
  </Text>
  <Text mb={2}>
    <strong>GitHub:</strong>{' '}
    {user.github ? (
      <Link href={`https://github.com/${user.github}`} isExternal color="blue.500">
        {user.github}
      </Link>
    ) : (
      'N/A'
    )}
  </Text>
  <Text mb={2}>
    <strong>LinkedIn:</strong>{' '}
    {user.linkedIn ? (
      <Link href={`https://www.linkedin.com/in/${user.linkedIn}`} isExternal color="blue.500">
        {user.linkedIn}
      </Link>
    ) : (
      'N/A'
    )}
  </Text>
              <p><strong>Current Job:</strong> {user.currentJob || 'N/A'}</p>
              <p><strong>Previous Job:</strong> {user.previousJob || 'N/A'}</p>
              <p><strong>Year Graduated:</strong> {user.yearGraduated || 'N/A'}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserList;
