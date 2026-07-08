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
    console.log("Geolocation is not supported");
    return;
  }
navigator.permissions
  .query({ name: "geolocation" })
  .then((result) => {
    console.log("Permission:", result.state);
  });
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("SUCCESS");
      console.log(position);

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);

      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("Permission denied");
          break;

        case error.POSITION_UNAVAILABLE:
          console.log("Location unavailable");
          break;

        case error.TIMEOUT:
          console.log("Request timeout");
          break;

        default:
          console.log("Unknown error");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
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
      if (location.latitude !== null && location.longitude !== null) {
  payload.append("latitude", location.latitude);
  payload.append("longitude", location.longitude);
}
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
      );
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
              CivicPulse · Citizen Portal
            </p>
            <h1 className="text-lg sm:text-xl font-bold leading-tight">
              {t("addComplaint")}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-sm font-semibold text-[#0B3D62] hover:underline mb-4 inline-block"
        >
          ← {t("backToDashboard")}
        </button>

        <div className="border border-[#0B3D62]/30 bg-white">
          <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-6 py-4">
            <h2 className="text-xl font-bold text-[#0B3D62] uppercase tracking-wide">
              {t("addComplaint")}
            </h2>
            <p className="text-xs text-[#5A5A5A] mt-1">
              {t("shareConcern")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#3A3A3A]">
                {t("village")}
              </span>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 text-sm border border-[#0B3D62]/30 bg-white focus:outline-none focus:border-[#0B3D62] rounded-none"
              />
            </label>

            <div className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#3A3A3A]">
                {t("complaintDescription")}
              </span>

              <div className="mt-2 space-y-3">

                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    type="button"
                    onClick={handleStartVoiceCapture}
                    disabled={listening || !browserSupportsSpeechRecognition}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 border border-[#0B3D62] text-[#0B3D62] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0B3D62] hover:text-white transition-colors"
                  >
                    <Mic size={14} />
                    {t("startRecording")}
                  </button>

                  <button
                    type="button"
                    onClick={handleStopVoiceCapture}
                    disabled={!listening}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 border border-[#8B1E23] text-[#8B1E23] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8B1E23] hover:text-white transition-colors"
                  >
                    <Square size={12} />
                    {t("stopRecording")}
                  </button>

                  <button
                    type="button"
                    onClick={handleClearVoice}
                    disabled={!formData.originalComplaint && !transcript}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 border border-[#0B3D62]/30 text-[#5A5A5A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0B3D62]/10 transition-colors"
                  >
                    <Trash2 size={13} />
                    {t("clear")}
                  </button>

                  {listening && (
                    <span className="text-xs font-semibold text-[#8B1E23] animate-pulse">
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
                  className="w-full px-3 py-2 text-sm border border-[#0B3D62]/30 bg-white focus:outline-none focus:border-[#0B3D62] rounded-none"
                />

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#3A3A3A]">
                    {t("uploadImage")}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full mt-1 text-xs text-[#5A5A5A] file:mr-3 file:py-1.5 file:px-3 file:border file:border-[#0B3D62] file:text-xs file:font-semibold file:uppercase file:bg-white file:text-[#0B3D62] hover:file:bg-[#0B3D62] hover:file:text-white file:cursor-pointer"
                  />
                  <small className="block text-[11px] text-[#5A5A5A] mt-1">
                    {t("imageNote")}
                  </small>
                </label>

                {imagePreview && (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt={t("complaintPreview")}
                      className="w-full max-h-72 object-cover border border-[#0B3D62]/30"
                    />
                    <div className="text-xs text-[#5A5A5A]">
                      {t("selectedImage")}: {image?.name}
                    </div>
                  </div>
                )}

                {!browserSupportsSpeechRecognition && (
                  <div className="text-xs text-[#8B1E23]">
                    {voiceError || t("speechNotSupported")}
                  </div>
                )}

                {browserSupportsSpeechRecognition && voiceError && (
                  <div className="text-sm text-[#8B1E23] border border-[#8B1E23]/40 bg-[#8B1E23]/5 px-3 py-2">
                    {voiceError}
                  </div>
                )}
              </div>
            </div>

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
              {isSubmitting ? t("submitting") : t("submitComplaint")}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-[#5A5A5A] mt-6">
          This is a system-generated portal. For official use only.
        </p>
      </div>
    </div>
  );
};

export default AddComplaint;