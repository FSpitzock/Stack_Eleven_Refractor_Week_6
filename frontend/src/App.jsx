import React, { useState } from 'react';

// Apollo hooks from the react entry point
import { useQuery, useMutation } from '@apollo/client/react';

// GraphQL operations
import { GET_QUESTIONS } from './graphql/queries';
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
} from './graphql/mutations';

// UI components
import QuestionsList from './components/QuestionsList';
import QuestionDetail from './components/QuestionDetail';
import CreateQuestionForm from './components/CreateQuestionForm';
import LoginForm from './components/LoginForm';

function App() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('hh:user')) || null
  );
  const [token, setToken] = useState(localStorage.getItem('hh:token') || '');

  const { loading: questionsLoading, data: questionsData } = useQuery(GET_QUESTIONS);

  const [selectedQuestionId, setSelectedQuestionId] = useState('');

  // Login & Register mutations (used in LoginForm component instead)
  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);

  const handleLoginSuccess = ({ token, user }) => {
    localStorage.setItem('hh:token', token);
    localStorage.setItem('hh:user', JSON.stringify(user));
    setToken(token);
    setAuthUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('hh:token');
    localStorage.removeItem('hh:user');
    setToken('');
    setAuthUser(null);
  };

  return (
    <main className="app">
      {/* AUTH SECTION */}
      {!authUser ? (
        <LoginForm onLogin={handleLoginSuccess} />
      ) : (
        <div className="card">
          <p>Signed in as: {authUser.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* QUESTIONS LIST */}
      <section className="card">
        <h2>Questions</h2>
        {questionsLoading ? (
          <p>Loading…</p>
        ) : (
          <QuestionsList onSelect={setSelectedQuestionId} />
        )}
      </section>

      {/* CREATE QUESTION */}
      {authUser && (
        <CreateQuestionForm onCreated={setSelectedQuestionId} />
      )}

      {/* QUESTION DETAIL */}
      {selectedQuestionId && (
        <QuestionDetail questionId={selectedQuestionId} />
      )}
    </main>
  );
}

export default App;
