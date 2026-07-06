import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import apiClient from '../api/axios.js';
import { useTranslation } from 'react-i18next';

const MpProfileModal = ({ onClose }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await apiClient.get('/auth/mpProfile');
        setProfile(res.data?.mp || res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || t('unableToLoadProfile'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const rows = profile
    ? [
        [t('name') || 'Name', profile.name],
        [t('email') || 'Email', profile.email],
        ['Government ID', profile.governmentId],
        ['Constituency Number', profile.constituencyNumber],
        ['Constituency Name', profile.constituencyName],
        [t('state') || 'State', profile.state],
      ]
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border border-[#0B3D62]/30 font-serif"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0B3D62] uppercase tracking-wide">
              MP Profile
            </h2>
            <p className="text-xs text-[#5A5A5A]">Representative account details</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[#0B3D62] hover:text-[#8B1E23] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-9 h-9 border-4 border-[#0B3D62]/20 border-t-[#0B3D62] rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="px-5 py-4">
            <div className="text-sm text-[#8B1E23] border border-[#8B1E23]/40 bg-[#8B1E23]/5 px-3 py-2">
              {error}
            </div>
          </div>
        ) : (
          <table className="w-full text-sm table-fixed">
            <tbody>
              {rows.map(([label, value], idx) => (
                <tr key={label} className={idx % 2 === 0 ? "bg-white" : "bg-[#0B3D62]/[0.03]"}>
                  <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 text-[#3A3A3A] w-2/5 align-top">
                    {label}
                  </td>
                  <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 font-semibold text-[#0B3D62] w-3/5 align-top break-words">
                    {value ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MpProfileModal;