import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Flex, Heading, Text, Container, Button, ButtonGroup, Link } from '@chakra-ui/react';
import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  const [updateUser] = useMutation(UPDATE_USER);
  const [isEditing, setIsEditing] = useState(false);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    github: "",
    linkedIn: "",
    currentJob: "",
    previousJob: "",
    yearGraduated: "",
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormState({
        username: user.username || "",
        email: user.email || "",
        github: user.github || "",
        linkedIn: user.linkedIn || "",
        currentJob: user.currentJob || "",
        previousJob: user.previousJob || "",
        yearGraduated: user.yearGraduated || "",
      });
    }
  }, [user]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser({
        variables: { ...formState },
      });
      alert("Profile updated successfully!");
      setIsEditing(false); // Exit edit mode after saving
    } catch (err) {
      console.error(err);
    }
  };

  if (
    Auth.loggedIn() &&
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
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
          <Text mb={4}>
            Use the navigation links above to sign up or log in!
          </Text>
          <Button as={Link} to="/login" colorScheme="blue">
            Login
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" mb={8}>
      <Box
        bg="gray.800"
        color="darkblue"
        p={6}
        mb={8}
        fontFamily="sans-serif"
        borderRadius="md"
      >
        <Heading size="lg">
          {userParam ? `${user.username}'s` : "My"} profile
        </Heading>
      </Box>

      {!userParam && (
        <div className="col-12 col-md-10 mb-3 p-3">
          {isEditing ? (
            <>
            
              <h3>Edit Profile</h3>
              <form onSubmit={handleFormSubmit}>
              <Box color="darkblue" p={6} mb={28} justifyContent = "center" alignItems = "center" fontFamily = "sans-serif" display = "flex" flexDirection="column" borderRadius="md" borderWidth={5} borderStyle="solid" borderColor="darkblue" fontWeight="bold" >
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formState.username}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="github">GitHub:</label>
                  <input
                    type="text"
                    name="github"
                    id="github"
                    value={formState.github}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="linkedIn">LinkedIn:</label>
                  <input
                    type="text"
                    name="linkedIn"
                    id="linkedIn"
                    value={formState.linkedIn}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentJob">Current Job:</label>
                  <input
                    type="text"
                    name="currentJob"
                    id="currentJob"
                    value={formState.currentJob}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="previousJob">Previous Job:</label>
                  <input
                    type="text"
                    name="previousJob"
                    id="previousJob"
                    value={formState.previousJob}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="yearGraduated">Year Graduated:</label>
                  <input
                    type="text"
                    name="yearGraduated"
                    id="yearGraduated"
                    value={formState.yearGraduated}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                </Box>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ml-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            </>
          ) : (
            <>
              <Box color="darkblue" p={6} mb={28} justifyContent = "center" alignItems = "center" fontFamily = "sans-serif" display = "flex" flexDirection="column" borderRadius="md" borderWidth={5} borderStyle="solid" borderColor="darkblue" fontWeight="bold" >
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>GitHub: {user.github}</p>
              <p>LinkedIn: {user.linkedIn}</p>
              <p>Current Job: {user.currentJob}</p>
              <p>Previous Job: {user.previousJob}</p>
              <p>Year Graduated: {user.yearGraduated}</p>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              </Box>
              
      
            </>
          )}
        </div>
      )}

     
    </Flex>
  );
};

export default Profile;
