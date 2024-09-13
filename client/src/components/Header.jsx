import { Link } from 'react-router-dom';
import { Flex, Heading, Container, Button } from '@chakra-ui/react';
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Container>
      <Flex
        bg="darkblue"
        color="gold"
        h="100px"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        fontFamily="sans-serif"
      >
        <Heading>Cal Berkeley Extension Alumni</Heading>
        <Flex>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me" mr={4}>
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                <Button bg = "yellow" h = "50px" maxW = "300px" fontSize = "25px" _hover={{ cursor: 'pointer' }}>
                {Auth.getProfile().authenticatedPerson.username}
                </Button>
              </Link>
              {/* Update the Logout button so that it logs the user out */}
              <Button onClick={logout} bg = "white" color = "darkblue"  h = "50px" w = "100px" fontSize = "25px" _hover={{ cursor: 'pointer' }}>Logout</Button>
              
            </>
          ) : (
            <>
              <Link to="/login" mr={4}>
                <Button bg = "yellow" h = "50px" w = "100px" fontSize = "25px" _hover={{ cursor: 'pointer' }} >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button bg = "white"  h = "50px" w = "100px" fontSize = "25px" _hover={{ cursor: 'pointer' }} >
                  Signup
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
  
    
    //   <div className="container flex-row justify-space-between-lg justify-center align-center">
    //     <div>
    //       <Link className="text-light" to="/">
    //         <h1 className="m-0">Tech Thoughts</h1>
    //       </Link>
    //       <p className="m-0">Get into the mind of a programmer.</p>
    //     </div>
       
    //     <div>
    //       {Auth.loggedIn() ? (
    //         <>
    //           <Link className="btn btn-lg btn-info m-2" to="/me">
    //             {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
    //             {Auth.getProfile().authenticatedPerson.username}'s profile
    //           </Link>
    //           <button className="btn btn-lg btn-light m-2" onClick={logout}>
    //             Logout
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <Link className="btn btn-lg btn-info m-2" to="/login">
    //             Login
    //           </Link>
    //           <Link className="btn btn-lg btn-light m-2" to="/signup">
    //             Signup
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    
    // </Box>
//   );
// };

// export default Header;
