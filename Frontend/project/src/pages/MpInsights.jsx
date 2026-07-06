import { useEffect, useState } from 'react';
import { BrainCircuit, Compass, MessageSquareWarning, Sparkles, TrendingUp } from 'lucide-react';
import apiClient from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useTranslation } from "react-i18next";

const MpInsights = () => {
  const { t } = useTranslation();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await apiClient.get('/mp/dashboard/insights');
        setInsights(response.data || null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          t("unableToLoadInsights")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const SkeletonCard = ({ large }) => (
    <div className={`border border-[#0B3D62]/20 bg-white p-5 ${large ? "sm:col-span-2" : ""}`}>
      <div className="h-3 w-1/3 bg-[#0B3D62]/10 animate-pulse mb-3" />
      <div className="h-4 w-full bg-[#0B3D62]/10 animate-pulse mb-2" />
      <div className="h-4 w-2/3 bg-[#0B3D62]/10 animate-pulse" />
    </div>
  );

  const InsightCard = ({ icon: Icon, label, value, large }) => (
    <div className={`border border-[#0B3D62]/30 bg-white ${large ? "sm:col-span-2" : ""}`}>
      <div className="flex items-start gap-3 px-5 py-4">
        <div className="w-9 h-9 rounded-full border-2 border-[#0B3D62]/40 flex items-center justify-center shrink-0 text-[#0B3D62]">
          <Icon size={16} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#5A5A5A]">{label}</p>
          <p className={`font-bold text-[#0B3D62] mt-1 ${large ? "text-sm leading-relaxed font-normal text-[#3A3A3A]" : "text-lg"}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3F1EA] text-[#1A1A1A] font-serif">

      {/* Tricolor strip */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        <Navbar
          title={t("aiInsights")}
          subtitle={t("aiInsightsSubtitle")}
        />

        {error && (
          <div className="mt-4">
            <ErrorMessage message={error} />
          </div>
        )}

        <section className="mt-6">
          <div className="border border-[#0B3D62]/30 bg-white mb-6">
            <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-5 py-3 flex items-center gap-2">
              <Sparkles size={14} className="text-[#0B3D62]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B3D62]">
                {t("aiPoweredRecommendations")}
              </span>
            </div>
            <div className="px-5 py-4">
              <h2 className="text-lg font-bold text-[#0B3D62] uppercase tracking-wide">
                {t("aiInsights")}
              </h2>
              <p className="text-sm text-[#5A5A5A] mt-1">{t("insightsDescription")}</p>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard large />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <InsightCard
                icon={Compass}
                label={t("topVillage")}
                value={insights?.topVillage || '—'}
              />

              <InsightCard
                icon={TrendingUp}
                label={t("topCategory")}
                value={insights?.topCategory || '—'}
              />

              <InsightCard
                icon={MessageSquareWarning}
                label={t("highUrgencyComplaints")}
                value={insights?.highUrgencyComplaints ?? '—'}
              />

              <InsightCard
                icon={BrainCircuit}
                label={t("aiRecommendation")}
                value={insights?.recommendation || t("noRecommendation")}
                large
              />
            </div>
          )}
        </section>

        <p className="text-center text-[10px] text-[#5A5A5A] mt-8">
          This is a system-generated record. For official use only.
        </p>
      </div>
    </div>
  );
};

export default MpInsights;