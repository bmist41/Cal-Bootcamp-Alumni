import { Box, Text } from '@chakra-ui/react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <Text fontFamily="sans-serif" fontSize="xl"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </Text>
      <Box bg = "dark">
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <Text font = "sans-serif">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </Text>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
      </Box>
    </>
  );
};

export default CommentList;
