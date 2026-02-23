import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Question from '../models/Question.js';
import User from '../models/User.js';

const resolvers = {
  Query: {
    questions: async () => {
      return Question.find()
        .populate('author')
        .populate('answers.author');
    },
    question: async (_, { id }) => {
      return Question.findById(id)
        .populate('author')
        .populate('answers.author');
    },
    me: async (_, __, { user }) => {
      // user will come from context after JWT verification
      if (!user) return null;
      return User.findById(user.id);
    },
  },

  Mutation: {
    // Register a new user and return JWT
    register: async (_, { username, email, password }) => {
      // basic validation
      if (!username || !email || !password) {
        throw new Error('All fields are required');
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashed });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return {
        token,
        user,
      };
    },

    // Login and get token
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return {
        token,
        user,
      };
    },

    // Create a Question only if logged in
    createQuestion: async (_, { title, body }, { user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      const question = new Question({
        title,
        body,
        author: user.id, 
      });
      await question.save();

      return question.populate('author');
    },

    // Create an Answer on a question by the logged in user
    createAnswer: async (_, { questionId, body }, { user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      const question = await Question.findById(questionId);
      if (!question) {
        throw new Error('Question not found');
      }

      question.answers.push({
        body,
        author: user.id,
      });

      await question.save();

      // Return the newly created answer object
      const newAnswer = question.answers[question.answers.length - 1];
      return newAnswer.populate('author');
    },
  },

  // Optional: tell GraphQL how to resolve nested fields
  Question: {
    author: (parent) => User.findById(parent.author),
  },
  Answer: {
    author: (parent) => User.findById(parent.author),
  },
};

export default resolvers;
