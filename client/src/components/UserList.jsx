import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_USERS } from '../utils/queries';

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
    <div>
      <h2 className="text-center">All User Profiles</h2>
      <div className="flex-row justify-center">
        {users.map((user) => (
          <div key={user._id} className="card col-12 col-md-3 m-3 p-3">
            <h4 className="card-header bg-primary text-light p-2">
              <Link className="text-light" to={`/profiles/${user.username}`}>{user.username}</Link>
            </h4>
            <div className="card-body">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>GitHub:</strong> {user.github || 'N/A'}</p>
              <p><strong>LinkedIn:</strong> {user.linkedIn || 'N/A'}</p>
              <p><strong>Current Job:</strong> {user.currentJob || 'N/A'}</p>
              <p><strong>Previous Job:</strong> {user.previousJob || 'N/A'}</p>
              <p><strong>Year Graduated:</strong> {user.yearGraduated || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
