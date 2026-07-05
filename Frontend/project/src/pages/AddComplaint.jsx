import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios.js';
import { useVoiceComplaint } from '../hooks/useVoiceComplaint.js';
import { useTranslation } from "react-i18next";
const AddComplaint = () => {
   const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ village: '', originalComplaint: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [location, setLocation] = useState({
  latitude: null,
  longitude: null,
});
  const isManualEditRef = useRef(false);
  
  const { transcript, listening, voiceError, browserSupportsSpeechRecognition, startVoiceCapture, stopVoiceCapture, clearVoiceCapture } = useVoiceComplaint();

  useEffect(() => {
    if (!isManualEditRef.current && transcript) {
      setFormData((prev) => ({ ...prev, originalComplaint: transcript }));
    }
  }, [transcript]);

  useEffect(() => {
    if (!image) {
      setImagePreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  useEffect(() => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
    }
  );
}, []);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.village.trim()) {
setError(t("villageRequired"));
      return;
    }

    if (!formData.originalComplaint.trim() && !image) {
setError(t("complaintRequired"));
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('village', formData.village);
      payload.append('originalComplaint', formData.originalComplaint);
payload.append("latitude", location.latitude);
payload.append("longitude", location.longitude);
      if (image) {
        payload.append('image', image);
      }

      await apiClient.post('/user/complaint', payload);
    setSuccess(t("submitSuccess"));
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
setError(
  err.response?.data?.message ||
  err.message ||
  t("submitFailed")
);;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', background: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 12px 35px rgba(15, 23, 42, 0.08)' }}>
<button
  type="button"
  onClick={() => navigate("/dashboard")}
  style={{
    border: "none",
    background: "transparent",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: 600,
    padding: 0,
    marginBottom: "16px",
  }}
>
  ← {t("backToDashboard")}
</button>

<h1 style={{ marginTop: 0, color: "#0f172a" }}>
  {t("addComplaint")}
</h1>

<p style={{ color: "#64748b", marginBottom: "20px" }}>
  {t("shareConcern")}
</p>

<form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
  <label
    style={{
      display: "grid",
      gap: "8px",
      color: "#334155",
      fontWeight: 600,
    }}
  >
    {t("village")}
    <input
      type="text"
      name="village"
      value={formData.village}
      onChange={handleChange}
      required
      style={{
        border: "1px solid #cbd5e1",
        borderRadius: "12px",
        padding: "10px 12px",
        fontSize: "15px",
      }}
    />
  </label>

  <label
    style={{
      display: "grid",
      gap: "8px",
      color: "#334155",
      fontWeight: 600,
    }}
  >
    {t("complaintDescription")}

    <div style={{ display: "grid", gap: "8px" }}>
      <div
        className="voice-toolbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={handleStartVoiceCapture}
          disabled={listening || !browserSupportsSpeechRecognition}
        >
          <Mic size={16} />
          {t("startRecording")}
        </button>

        <button
          type="button"
          onClick={handleStopVoiceCapture}
          disabled={!listening}
        >
          <Square size={14} />
          {t("stopRecording")}
        </button>

        <button
          type="button"
          onClick={handleClearVoice}
          disabled={!formData.originalComplaint && !transcript}
        >
          <Trash2 size={15} />
          {t("clear")}
        </button>

        {listening && (
          <span>
            {t("listening")}
          </span>
        )}
      </div>

      <textarea
        name="originalComplaint"
        value={formData.originalComplaint}
        onChange={handleChange}
        rows="6"
        placeholder={t("complaintPlaceholder")}
      />

      <label style={{ fontWeight: 600 }}>
        {t("uploadImage")}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <small style={{ color: "#64748b" }}>
        {t("imageNote")}
      </small>

      {imagePreview && (
        <div style={{ display: "grid", gap: "8px" }}>
          <img
            src={imagePreview}
          alt={t("complaintPreview")}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
          <div>
  {t("selectedImage")}: {image?.name}
</div>
        </div>
      )}

      {!browserSupportsSpeechRecognition && (
        <div>
          {voiceError || t("speechNotSupported")}
        </div>
      )}

   {browserSupportsSpeechRecognition && voiceError && (
  <div
    style={{
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "10px",
      borderRadius: "8px",
    }}
  >
    {voiceError}
  </div>
)}
    </div>
  </label>

{error && (
  <div
    style={{
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "12px",
      borderRadius: "10px",
      fontWeight: 500,
    }}
  >
    {error}
  </div>
)}

  {success && (
  <div
    style={{
      background: "#dcfce7",
      color: "#166534",
      padding: "12px",
      borderRadius: "10px",
      fontWeight: 500,
    }}
  >
    {success}
  </div>
)}

  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? t("submitting") : t("submitComplaint")}
  </button>
</form>
      </div>
    </div>
  );
};

export default AddComplaint;
