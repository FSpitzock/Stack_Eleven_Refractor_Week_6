import React from 'react';

// ⚠️ Import Apollo hooks this way for Vite compatibility
import pkg from '@apollo/client';
const { useQuery } = pkg;

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
            <strong>{q.title}</strong> — by {q.author?.username}
          </li>
        ))}
      </ul>
    </section>
  );
}
