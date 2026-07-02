import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios.js';
import { useVoiceComplaint } from '../hooks/useVoiceComplaint.js';

const AddComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ village: '', originalComplaint: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isManualEditRef = useRef(false);

  const { transcript, listening, voiceError, browserSupportsSpeechRecognition, startVoiceCapture, stopVoiceCapture, clearVoiceCapture } = useVoiceComplaint();

  useEffect(() => {
    if (!isManualEditRef.current && transcript) {
      setFormData((prev) => ({ ...prev, originalComplaint: transcript }));
    }
  }, [transcript]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    isManualEditRef.current = name === 'originalComplaint';
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartVoiceCapture = () => {
    isManualEditRef.current = false;
    startVoiceCapture();
  };

  const handleStopVoiceCapture = () => {
    stopVoiceCapture();
  };

  const handleClearVoice = () => {
    clearVoiceCapture();
    isManualEditRef.current = false;
    setFormData((prev) => ({ ...prev, originalComplaint: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await apiClient.post('/user/complaint', {
        village: formData.village,
        originalComplaint: formData.originalComplaint,
      });
      setSuccess('Complaint submitted successfully.');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to submit complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', background: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 12px 35px rgba(15, 23, 42, 0.08)' }}>
        <button type="button" onClick={() => navigate('/dashboard')} style={{ border: 'none', background: 'transparent', color: '#2563eb', cursor: 'pointer', fontWeight: 600, padding: 0, marginBottom: '16px' }}>
          ← Back to Dashboard
        </button>
        <h1 style={{ marginTop: 0, color: '#0f172a' }}>Add New Complaint</h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>Share your concern and we will help you track it.</p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <label style={{ display: 'grid', gap: '8px', color: '#334155', fontWeight: 600 }}>
            Village
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              required
              style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '10px 12px', fontSize: '15px' }}
            />
          </label>

          <label style={{ display: 'grid', gap: '8px', color: '#334155', fontWeight: 600 }}>
            Complaint Description
            <div style={{ display: 'grid', gap: '8px' }}>
              <div className="voice-toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="voice-action-btn"
                  onClick={handleStartVoiceCapture}
                  disabled={listening || !browserSupportsSpeechRecognition}
                  style={{ width: 'auto', padding: '10px 14px', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', background: listening ? '#fef2f2' : '#eff6ff', color: listening ? '#dc2626' : '#1d4ed8', border: '1px solid #bfdbfe' }}
                >
                  <Mic size={16} />
                  Start Recording
                </button>
                <button
                  type="button"
                  className="voice-action-btn"
                  onClick={handleStopVoiceCapture}
                  disabled={!listening}
                  style={{ width: 'auto', padding: '10px 14px', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}
                >
                  <Square size={14} />
                  Stop Recording
                </button>
                <button
                  type="button"
                  className="voice-action-btn"
                  onClick={handleClearVoice}
                  disabled={!formData.originalComplaint && !transcript}
                  style={{ width: 'auto', padding: '10px 14px', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}
                >
                  <Trash2 size={15} />
                  Clear
                </button>
                {listening && (
                  <span className="voice-listening-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '999px', background: '#fef2f2', color: '#b91c1c', fontWeight: 700 }}>
                    <span className="voice-listening-dot" />
                    Listening...
                  </span>
                )}
              </div>
              <textarea
                name="originalComplaint"
                value={formData.originalComplaint}
                onChange={handleChange}
                required
                rows="6"
                style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '10px 12px', resize: 'vertical', fontSize: '15px', minHeight: '160px' }}
                placeholder="Describe your complaint here or use voice recording"
              />
              {!browserSupportsSpeechRecognition && (
                <div className="voice-error" style={{ padding: '10px 12px', borderRadius: '12px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}>
                  {voiceError || 'Speech Recognition is not supported in this browser.'}
                </div>
              )}
              {browserSupportsSpeechRecognition && voiceError && (
                <div className="voice-error" style={{ padding: '10px 12px', borderRadius: '12px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}>
                  {voiceError}
                </div>
              )}
            </div>
          </label>

          {error && <div style={{ padding: '12px 14px', borderRadius: '12px', background: '#fee2e2', color: '#b91c1c' }}>{error}</div>}
          {success && <div style={{ padding: '12px 14px', borderRadius: '12px', background: '#dcfce7', color: '#166534' }}>{success}</div>}

          <button type="submit" disabled={isSubmitting} style={{ border: 'none', background: '#2563eb', color: '#ffffff', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700 }}>
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComplaint;
