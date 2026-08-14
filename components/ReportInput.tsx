'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ReportInputProps {
  onSubmit: (data: { message: string; location?: string; imageDataUrl?: string }) => void;
  isSubmitting?: boolean;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onresult: (event: { results: Array<Array<{ transcript: string }>> }) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

export default function ReportInput({ onSubmit, isSubmitting = false }: ReportInputProps) {
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const win = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
          setIsRecording(true);
          setVoiceError('');
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0]?.[0]?.transcript;
          if (transcript) {
            setMessage((prev) => (prev ? prev + ' ' + transcript : transcript));
          }
        };
        
        recognition.onerror = (event) => {
          if (event.error === 'not-allowed') {
            setVoiceError('Microphone permission denied.');
          } else {
            setVoiceError(`Voice input error: ${event.error}`);
          }
          setIsRecording(false);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognitionRef.current = recognition;
        queueMicrotask(() => setSpeechSupported(true));
      } catch {
        queueMicrotask(() => setSpeechSupported(false));
      }
    }
  }, []);

  const handleSample = () => {
    setMessage('Barish ke baad school ke bahar nala band hai. Pani jama ho raha hai aur bachon ko andar jana mushkil hai.');
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageDataUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch {
        setVoiceError('Could not start voice input.');
      }
    }
  };

  const handleSubmit = () => {
    if (!message.trim()) {
      setError('Please describe the issue before submitting.');
      return;
    }
    setError('');
    onSubmit({ message, location: location || undefined, imageDataUrl });
  };

  const locations = [
    'Model Town', 'Gulberg', 'DHA Phase 5', 'Johar Town', 'Garden Town', 
    'Iqbal Town', 'Samanabad', 'Wapda Town', 'Bahria Town', 'Other'
  ];

  return (
    <div className="w-full max-w-screen-md mx-auto p-4 flex flex-col gap-4">
      {/* Sample Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSample}
          className="flex items-center gap-2 text-sm text-[#00513a] font-medium py-1 px-3 rounded-full border border-[#bec9c2] hover:bg-[#f3f4f1] transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          Try sample report
        </button>
      </div>

      {/* Main Text Area Card */}
      <div className="border border-[#e2e3e0] rounded-xl p-4 bg-white flex flex-col gap-2">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (e.target.value.trim()) setError('');
          }}
          placeholder="Describe your civic issue in English, Urdu, or Roman Urdu..."
          className="w-full min-h-[120px] outline-none resize-y text-[#191c1b] placeholder:text-[#3f4944] bg-transparent"
        />
        
        {/* Controls Row under text area */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e2e3e0]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full text-[#3f4944] hover:bg-[#f3f4f1] transition-colors flex items-center justify-center cursor-pointer"
              title="Add photo"
            >
              <span className="material-symbols-outlined">add_photo_alternate</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            <button
              type="button"
              onClick={toggleRecording}
              disabled={!speechSupported}
              title={speechSupported ? 'Use voice input' : 'Voice input not supported in this browser'}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                !speechSupported 
                  ? 'text-[#bec9c2] cursor-not-allowed' 
                  : isRecording 
                    ? 'text-[#ba1a1a] bg-[#ffdad6] cursor-pointer' 
                    : 'text-[#3f4944] hover:bg-[#f3f4f1] cursor-pointer'
              }`}
            >
              {isRecording ? (
                <div className="relative flex items-center justify-center w-6 h-6">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75 animate-ping"></span>
                  <span className="relative material-symbols-outlined text-[#ba1a1a]">stop</span>
                </div>
              ) : (
                <span className="material-symbols-outlined">mic</span>
              )}
            </button>
          </div>
          
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sm border border-[#bec9c2] rounded-lg px-2 py-1.5 text-[#3f4944] bg-transparent outline-none max-w-[150px] sm:max-w-[200px] truncate"
          >
            <option value="">Select location (optional)</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        {/* Voice Error Display */}
        {voiceError && (
          <p className="text-sm text-[#ba1a1a] mt-1">{voiceError}</p>
        )}
      </div>

      {/* Image Preview */}
      {imageDataUrl && (
        <div className="relative inline-block self-start mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageDataUrl} 
            alt="Selected preview" 
            className="h-20 w-20 object-cover rounded-lg border border-[#bec9c2]" 
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-white text-[#191c1b] border border-[#bec9c2] rounded-full p-0.5 hover:bg-[#f3f4f1] transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Validation Error */}
      {error && (
        <p className="text-sm text-[#ba1a1a] px-2">{error}</p>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-[#00513a] text-[#ffffff] rounded-[20px] py-3 px-6 flex items-center justify-center gap-2 font-medium hover:bg-[#0d6b4f] transition-colors disabled:opacity-70 mt-2 cursor-pointer"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <span className="material-symbols-outlined">auto_awesome</span>
        )}
        {isSubmitting ? 'Analyzing...' : 'Analyze with AI'}
      </button>
    </div>
  );
}
