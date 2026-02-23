import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const startServer = async () => {
  try {
    // start Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app.use(
      '/graphql',
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          return { req };
        },
      })
    );

    // connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
