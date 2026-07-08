import { useCallback, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const DEFAULT_LANGUAGE = "hi-IN";

export const useVoiceComplaint = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [voiceError, setVoiceError] = useState("");

  const startVoiceCapture = useCallback(async () => {
    setVoiceError("");

    if (!browserSupportsSpeechRecognition) {
      setVoiceError("Speech Recognition supported nahi hai. Chrome use karo.");
      return;
    }

    if (isMicrophoneAvailable === false) {
      setVoiceError("Microphone permission denied hai. Browser settings mein allow karo.");
      return;
    }

    if (listening) return;

    resetTranscript();

    try {
      await SpeechRecognition.startListening({
        language: DEFAULT_LANGUAGE,
        continuous: true,
      });
    } catch (err) {
      console.error("startListening error:", err);
      setVoiceError("Recording start nahi ho payi: " + err.message);
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable, listening, resetTranscript]);

  const stopVoiceCapture = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  const clearVoiceCapture = useCallback(() => {
    resetTranscript();
    setVoiceError("");
  }, [resetTranscript]);

  return {
    transcript,
    listening,
    voiceError,
    browserSupportsSpeechRecognition,
    startVoiceCapture,
    stopVoiceCapture,
    clearVoiceCapture,
  };
};