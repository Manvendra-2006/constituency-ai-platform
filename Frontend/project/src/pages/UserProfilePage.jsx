import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import apiClient from '../api/axios.js';
import { useTranslation } from 'react-i18next';

const UserProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await apiClient.get('/auth/getMe'); // apna actual user-profile route yahan daal

        console.log('USER PROFILE RAW RESPONSE:', res.data); // debug ke liye, baad me hata dena

        const raw =
          res.data?.userProfile ||
          res.data?.user ||
          res.data?.data?.user ||
          res.data?.data ||
          res.data;

        if (!raw || Object.keys(raw).length === 0) {
          setError('Profile data empty aayi hai — backend response shape check karo');
          return;
        }

        const normalized = {};
        Object.keys(raw).forEach((key) => {
          normalized[key.toLowerCase()] = raw[key];
        });

        setProfile(normalized);
      } catch (err) {
        setError(err.response?.data?.message || err.message || t('unableToLoadProfile'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const pick = (...keys) => {
    if (!profile) return undefined;
    for (const k of keys) {
      const v = profile[k.toLowerCase()];
      if (v !== undefined && v !== null && v !== '') return v;
    }
    return undefined;
  };

  const rows = profile
    ? [
        [t('name') || 'Name', pick('name', 'fullName', 'userName')],
        [t('email') || 'Email', pick('email')],
        ['Phone', pick('phone', 'phoneNumber', 'mobile')],
        ['Address', pick('address', 'district', 'city')],
        ['Constituency Name', pick('constituencyName', 'constituency')],
        [t('state') || 'State', pick('state')],
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#F5F3EE] font-serif">
      {/* Top bar */}
      <div className="bg-[#0B3D62] px-6 py-4 flex items-center gap-4 shadow-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="text-white hover:text-[#F0C419] transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white uppercase tracking-wide">
            My Profile
          </h1>
          <p className="text-xs text-white/70">Citizen account details</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white border border-[#0B3D62]/30 shadow-sm overflow-hidden">
          <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-6 py-4">
            <h2 className="text-base font-bold text-[#0B3D62] uppercase tracking-wide">
              Profile Details
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-9 h-9 border-4 border-[#0B3D62]/20 border-t-[#0B3D62] rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="px-6 py-6">
              <div className="text-sm text-[#8B1E23] border border-[#8B1E23]/40 bg-[#8B1E23]/5 px-4 py-3">
                {error}
              </div>
            </div>
          ) : (
            <div className="w-full">
              {rows.map(([label, value], idx) => (
                <div
                  key={label}
                  className={`flex w-full border-t border-[#0B3D62]/10 ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#0B3D62]/[0.03]"
                  }`}
                >
                  <div className="px-6 py-3.5 text-sm text-[#3A3A3A] w-2/5 shrink-0">
                    {label}
                  </div>
                  <div className="px-6 py-3.5 text-sm font-semibold text-[#0B3D62] w-3/5 break-words">
                    {value ?? '—'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;