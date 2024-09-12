import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text, Container, Button, ButtonGroup, Link } from '@chakra-ui/react';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Box as="footer" w="100%" mt="auto" bg="darkblue" color="yellow" p={4}>
            <Container maxW="container.lg">
                <Flex justify="space-around" align="center">
                    <Heading as="h4" size="md" mb={4}>
                        Created by the{' '}
                        <Link
                            href="https://github.com/bmist41/Cal-Bootcamp-Alumni"
                            isExternal
                            color="white"
                            _hover={{ textDecoration: 'underline' }}
                        >
                            Berkeley Legends
                        </Link>
                    </Heading>
                    {location.pathname !== "/" && (
                        <Button
                            bg="white"
                            maxH="50px"
                            maxW="150px"
                            fontFamily={"sans-serif"}
                            fontSize="20px"
                            _hover={{ cursor: 'pointer' }}
                        >
                            &larr; Go Back
                        </Button>
                    )}
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;
        // <footer className="w-100 mt-auto bg-secondary p-4">
        //     <div className="container text-center mb-5">
        //         {location.pathname !== "/" && (
        //             <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
        //                 &larr; Go Back
        //             </button>
        //         )}
        //         <h4>
        //             Made with{" "}
        //             <span
        //                 className="emoji"
        //                 role="img"
        //                 aria-label="heart"
        //                 aria-hidden="false"
        //             >
        //                 ❤️
        //             </span>{" "}
        //             by the Tech Thoughts team.
        //         </h4>
        //     </div>
        // </footer>

