import React, { useState } from 'react';

// ✅ Import hooks from React‑specific Apollo entry
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '../graphql/mutations';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { token, user } = data.login;
      localStorage.setItem('hh:token', token);
      localStorage.setItem('hh:user', JSON.stringify(user));
      if (onLogin) onLogin({ token, user });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ variables: { email, password } });
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  return (
    <section className="card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      {error && <p className="error">Error: {error.message}</p>}
    </section>
  );
}

export default LoginForm;
