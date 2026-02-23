import jwt from 'jsonwebtoken';
import User from './models/User.js';

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
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

      if (!token) {
        return { user: null };  // no user, just anonymous
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        return { user };
      } catch (err) {
        console.warn('Invalid token', err);
        return { user: null };
      }
    },
  })
);
