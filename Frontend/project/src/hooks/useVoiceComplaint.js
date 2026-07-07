import { useCallback, useEffect, useState } from "react";
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
  } = useSpeechRecognition();

  const [voiceError, setVoiceError] = useState("");

  useEffect(() => {
    console.log("[Voice] browserSupportsSpeechRecognition:", browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);

  const startVoiceCapture = useCallback(() => {
    setVoiceError("");
    console.log("[Voice] startVoiceCapture called");

    if (!browserSupportsSpeechRecognition) {
      setVoiceError("Speech Recognition is not supported in this browser.");
      console.log("[Voice] browser does not support speech recognition");
      return;
    }

    if (listening) return;

    resetTranscript();

    SpeechRecognition.startListening({
      language: DEFAULT_LANGUAGE,
      continuous: true,
    }).catch((err) => {
      console.error("[Voice] startListening failed:", err);
      setVoiceError(`Failed to start: ${err.message || err}`);
    });
  }, [browserSupportsSpeechRecognition, listening, resetTranscript]);

  const stopVoiceCapture = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
  }, [listening]);

  const clearVoiceCapture = useCallback(() => {
    resetTranscript();
    setVoiceError("");
  }, [resetTranscript]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

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