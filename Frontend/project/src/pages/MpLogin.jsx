import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const MpLogin = () => {
  const { loginMp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    console.log('[MpLogin] submitting MP login form');

    try {
      await loginMp(formData);
      console.log('[MpLogin] login completed, navigating to /mp');
      navigate('/mp', { replace: true });
    } catch (err) {
      console.error('[MpLogin] login failed', err);
      setError(err.response?.data?.message || err.message || 'Unable to login.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              CivicPulse · Representative Portal
            </p>
            <h1 className="text-lg sm:text-xl font-bold leading-tight">
              MP Login
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">

        <div className="border border-[#0B3D62]/30 bg-white">
          <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-6 py-4 text-center">
            <h2 className="text-xl font-bold text-[#0B3D62] uppercase tracking-wide">
              MP Login
            </h2>
            <p className="text-xs text-[#5A5A5A] mt-1">
              Sign in to access your representative dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#3A3A3A]">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 text-sm border border-[#0B3D62]/30 bg-white focus:outline-none focus:border-[#0B3D62] rounded-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#3A3A3A]">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 text-sm border border-[#0B3D62]/30 bg-white focus:outline-none focus:border-[#0B3D62] rounded-none"
              />
            </label>

            {error && (
              <div className="text-sm text-[#8B1E23] border border-[#8B1E23]/40 bg-[#8B1E23]/5 px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm font-semibold uppercase tracking-wide bg-[#0B3D62] text-white hover:bg-[#0B3D62]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="border-t border-dashed border-[#0B3D62]/20 px-6 py-4 text-center space-y-1">
            <p className="text-xs text-[#5A5A5A]">
              Need an MP account?{' '}
              <Link to="/mp/register" className="text-[#0B3D62] font-semibold hover:underline">
                Register as MP
              </Link>
            </p>
            <p className="text-xs text-[#5A5A5A]">
              User?{' '}
              <Link to="/login" className="text-[#0B3D62] font-semibold hover:underline">
                User login
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

export default MpLogin;