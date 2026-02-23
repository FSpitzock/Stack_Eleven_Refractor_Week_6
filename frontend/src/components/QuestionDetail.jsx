import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_QUESTION } from '../graphql/queries';
import { CREATE_ANSWER } from '../graphql/mutations';

function QuestionDetail({ questionId }) {
  const { loading, error, data } = useQuery(GET_QUESTION, {
    variables: { id: questionId },
  });

  const [answerBody, setAnswerBody] = useState('');

  const [createAnswer] = useMutation(CREATE_ANSWER, {
    refetchQueries: [{ query: GET_QUESTION, variables: { id: questionId } }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answerBody.trim()) return;
    try {
      await createAnswer({
        variables: { questionId, body: answerBody },
      });
      setAnswerBody('');
    } catch (e) {
      console.error('Failed to post answer:', e);
    }
  };

  if (loading) return <p>Loading question…</p>;
  if (error) return <p>Error loading question: {error.message}</p>;

  const { question } = data;

  return (
    <section className="card">
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      <p>
        <em>asked by:</em> {question.author?.username}
      </p>

      <h3>Answers</h3>
      {question.answers.length === 0 ? (
        <p>No answers yet.</p>
      ) : (
        <ul>
          {question.answers.map((ans) => (
            <li key={ans.id}>
              {ans.body} — <strong>{ans.author?.username}</strong>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="stack">
        <textarea
          rows="3"
          placeholder="Write your answer"
          value={answerBody}
          onChange={(e) => setAnswerBody(e.target.value)}
        />
        <button type="submit">Post Answer</button>
      </form>
    </section>
  );
}

export default QuestionDetail;
