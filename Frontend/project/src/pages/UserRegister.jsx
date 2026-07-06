import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios.js';

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    village: '',
    district: '',
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
      await apiClient.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        village: formData.village,
        district: formData.district,
        state: formData.state,
      });

      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to register.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { label: 'Full Name', name: 'name', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Village', name: 'village', type: 'text' },
    { label: 'District', name: 'district', type: 'text' },
    { label: 'State', name: 'state', type: 'text' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F1EA] text-[#1A1A1A] font-serif">

      {/* Tricolor strip */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Official header */}
      <header className="bg-[#0B3D62] text-white border-b-4 border-[#8B1E23]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full border-2 border-[#FFD34D] flex items-center justify-center text-xs font-bold shrink-0">
            GoI
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#FFD34D]">
              CivicPulse · Citizen Portal
            </p>
            <h1 className="text-lg sm:text-xl font-bold leading-tight">
              Grievance Redressal System
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">

        <div className="border border-[#0B3D62]/30 bg-white">
          <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-6 py-4 text-center">
            <h2 className="text-xl font-bold text-[#0B3D62] uppercase tracking-wide">
              User Registration
            </h2>
            <p className="text-xs text-[#5A5A5A] mt-1">
              Create your citizen account to file grievances
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {fields.map(({ label, name, type }) => (
              <label className="block" key={name}>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#3A3A3A]">
                  {label}
                </span>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 text-sm border border-[#0B3D62]/30 bg-white focus:outline-none focus:border-[#0B3D62] rounded-none"
                />
              </label>
            ))}

            {error && (
              <div className="text-sm text-[#8B1E23] border border-[#8B1E23]/40 bg-[#8B1E23]/5 px-3 py-2">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-[#138808] border border-[#138808]/40 bg-[#138808]/5 px-3 py-2">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm font-semibold uppercase tracking-wide bg-[#0B3D62] text-white hover:bg-[#0B3D62]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <div className="border-t border-dashed border-[#0B3D62]/20 px-6 py-4 text-center">
            <p className="text-xs text-[#5A5A5A]">
              Already registered?{' '}
              <Link to="/login" className="text-[#0B3D62] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-[#5A5A5A] mt-6">
          This is a system-generated portal. For official use only.
        </p>
      </div>
    </div>
  );
};

export default UserRegister