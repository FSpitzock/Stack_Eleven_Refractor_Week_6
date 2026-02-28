import React from 'react';
// ✅ Apollo hooks import for Vite and React
import { useQuery } from '@apollo/client/react';

import { GET_QUESTIONS } from '../graphql/queries';

export default function QuestionsList() {
  const { loading, error, data } = useQuery(GET_QUESTIONS);

  if (loading) return <p>Loading questions…</p>;
  if (error) return <p>Error loading questions: {error.message}</p>;

  return (
    <section className="questions-list">
      <h2>Questions</h2>
      <ul>
        {data.questions.map((q) => (
          <li key={q.id}>
            <strong>{q.title}</strong> — by {q.author?.username || 'Unknown'}
          </li>
        ))}
      </ul>
    </section>
  );
}