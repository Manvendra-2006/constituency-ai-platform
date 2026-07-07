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

  const startVoiceCapture = useCallback(() => {
    setVoiceError("");

    if (!browserSupportsSpeechRecognition) {
      setVoiceError("Speech Recognition is not supported in this browser.");
      return;
    }

    if (listening) return;

    resetTranscript();

    SpeechRecognition.startListening({
      language: DEFAULT_LANGUAGE,
      continuous: true,
    });
  }, [browserSupportsSpeechRecognition, listening, resetTranscript]);
const stopVoiceCapture = useCallback(() => {
  console.log("Stop button clicked");

  if (listening) {
    console.log("Stopping...");
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