import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_QUESTION } from '../graphql/mutations';
import { GET_QUESTIONS } from '../graphql/queries';

function CreateQuestionForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [createQuestion, { loading, error }] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTIONS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createQuestion({
        variables: { title, body },
      });

      setTitle('');
      setBody('');
      if (onCreated) onCreated(result.data.createQuestion.id);
    } catch (e) {
      console.error('Error creating question:', e);
    }
  };

  return (
    <section className="card">
      <h2>Create Question</h2>

      <form onSubmit={handleSubmit} className="stack">
        <input
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Question details"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting…' : 'Post Question'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </section>
  );
}

export default CreateQuestionForm;
