const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Start Apollo Server and apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Middleware for parsing incoming requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Catch-all route for serving React frontend
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // Connect to the database and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Server running on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Start the Apollo server
startServer();

