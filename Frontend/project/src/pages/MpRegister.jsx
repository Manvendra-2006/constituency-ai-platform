import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios.js';

const MpRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    governmentId: '',
    constituencyNumber: '',
    constituencyName: '',
    state: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await apiClient.post('/registermp', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        governmentId: formData.governmentId,
        constituencyNumber: Number(formData.constituencyNumber),
        constituencyName: formData.constituencyName,
        state: formData.state,
      });

      setSuccess('Registration successful. Redirecting to MP login...');
      setTimeout(() => navigate('/mp/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to register.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-form">
        <h1>MP Registration</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Government ID
            <input
              type="text"
              name="governmentId"
              value={formData.governmentId}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Constituency Number
            <input
              type="text"
              name="constituencyNumber"
              value={formData.constituencyNumber}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Constituency Name
            <input
              type="text"
              name="constituencyName"
              value={formData.constituencyName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            State
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p>
          Already registered? <Link to="/mp/login">MP sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default MpRegister;
