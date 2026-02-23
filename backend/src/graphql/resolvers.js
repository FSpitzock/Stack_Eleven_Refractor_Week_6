import Question from '../models/Question.js';
import User from '../models/User.js';

const resolvers = {
  Query: {
    questions: async () => {
      // find all questions — use populate to fill author and answers.author
      return Question.find()
        .populate('author')
        .populate('answers.author');
    },
    question: async (_, { id }) => {
      return Question.findById(id)
        .populate('author')
        .populate('answers.author');
    },
    me: async (_, __, { req }) => {
      // early placeholder — will add auth later
      return null;
    },
  },
};

export default resolvers;
