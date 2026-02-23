import jwt from 'jsonwebtoken';
import User from './models/User.js'; // make sure this import path matches your folder structure

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // Get token from Authorization header
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

      // If no token, user stays null
      if (!token) {
        return { user: null };
      }

      try {
        // Verify the token and get payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB if needed
        const user = await User.findById(decoded.id);

        return { user };
      } catch (err) {
        console.warn('Invalid token:', err.message);
        return { user: null };
      }
    },
  })
);
