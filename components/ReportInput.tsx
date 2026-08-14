'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Camera, MapPin, Sparkles, X, AlertCircle } from 'lucide-react';

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
  const [location, setLocation] = useState('Model Town, Lahore');
  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  
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
          setVoiceNotice('Listening... speak now in Urdu, Roman Urdu, or English');
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0]?.[0]?.transcript;
          if (transcript) {
            setMessage((prev) => (prev ? prev + ' ' + transcript : transcript));
            setVoiceNotice('Voice recorded successfully!');
          }
        };
        
        recognition.onerror = (event) => {
          if (event.error === 'not-allowed') {
            setVoiceNotice('Microphone access not allowed. You can type your report instead.');
          } else {
            setVoiceNotice('Voice input unavailable. You can type your report instead.');
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
    } else {
      queueMicrotask(() => setSpeechSupported(false));
    }
  }, []);

  const handleMicClick = () => {
    if (!speechSupported) {
      setVoiceNotice('Browser speech recognition unavailable. You can type your report instead.');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      try {
        setVoiceNotice('Starting microphone...');
        recognitionRef.current?.start();
      } catch {
        setVoiceNotice('Could not start microphone. You can type your report instead.');
      }
    }
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

  const handleChipClick = (scenario: { text: string; loc: string }) => {
    setMessage(scenario.text);
    setLocation(scenario.loc);
    setError('');
  };

  const handleSubmit = () => {
    if (!message.trim()) {
      setError('Please describe your civic issue or select a demo prompt before analyzing.');
      return;
    }
    setError('');
    onSubmit({ message: message.trim(), location: location || undefined, imageDataUrl });
  };

  const demoChips = [
    {
      label: 'Blocked drain near school',
      text: 'Barish ke baad school ke bahar nala band hai. Pani jama ho raha hai aur bachon ko andar jana mushkil hai.',
      loc: 'Model Town, Lahore',
    },
    {
      label: 'Garbage uncollected',
      text: 'Humaray mohallay mein pichlay 7 din se kachra nahi uthaya gaya. Bohat badbu phail rahi hai aur bemari phailnay ka khatra hai.',
      loc: 'Gulberg, Lahore',
    },
    {
      label: 'Dangerous pothole',
      text: 'Main road par bohat bara garha (pothole) bana hua hai jis ki wajah se roz bike aur gaari accident ho rahay hain.',
      loc: 'DHA Phase 5, Lahore',
    },
  ];

  const locations = [
    'Model Town, Lahore',
    'Gulberg, Lahore',
    'DHA Phase 5, Lahore',
    'Johar Town, Lahore',
    'Garden Town, Lahore',
    'Iqbal Town, Lahore',
    'Samanabad, Lahore',
    'Wapda Town, Lahore',
    'Bahria Town, Lahore',
    'Karachi Central',
    'Islamabad Sector F-7',
    'Peshawar City',
    'Rawalpindi',
    'Other Location',
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Main Report Card */}
      <div className="bg-white rounded-2xl p-5 md:p-7 border border-[#e2e3e0] shadow-sm hover:shadow-md transition-shadow">
        
        {/* Large Microphone Section */}
        <div className="flex flex-col items-center justify-center py-2 pb-4 text-center">
          <div className="relative flex items-center justify-center mb-3">
            {isRecording && (
              <span className="absolute w-24 h-24 rounded-full bg-[#ba1a1a]/20 animate-ping" />
            )}
            <button
              type="button"
              onClick={handleMicClick}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95 cursor-pointer ${
                isRecording
                  ? 'bg-[#ba1a1a] ring-4 ring-[#ffdad6]'
                  : 'bg-[#00513a] hover:bg-[#0d6b4f] ring-4 ring-[#a1f3cf]/50'
              }`}
              aria-label="Tap to speak"
            >
              {isRecording ? (
                <MicOff className="w-8 h-8 animate-pulse" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <p className="font-bold text-base md:text-lg text-[#00513a]">
            {isRecording ? 'Listening now...' : 'Tap to speak'}
          </p>
          <p className="text-xs md:text-sm text-[#56615c] mt-0.5">
            Urdu, Roman Urdu, or English
          </p>

          {voiceNotice && (
            <div className="flex items-center gap-1.5 text-xs text-[#00513a] bg-[#a1f3cf]/30 border border-[#00513a]/20 px-3 py-1 rounded-full mt-2.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{voiceNotice}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-3">
          <div className="flex-grow border-t border-[#e2e3e0]"></div>
          <span className="flex-shrink mx-3 text-[11px] font-bold tracking-wider text-[#56615c] uppercase bg-[#f3f4f1] px-2.5 py-0.5 rounded-full">
            OR DESCRIBE THE ISSUE
          </span>
          <div className="flex-grow border-t border-[#e2e3e0]"></div>
        </div>

        {/* Text Area */}
        <div className="relative bg-[#f9faf7] rounded-xl border border-[#bec9c2]/60 focus-within:border-[#00513a] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#a1f3cf]/40 transition-all p-3.5 mb-3.5">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value.trim()) setError('');
            }}
            placeholder="For example: Barish ke baad school ke bahar nala band hai..."
            rows={4}
            className="w-full bg-transparent outline-none resize-y text-[#191c1b] placeholder:text-[#56615c]/70 text-sm md:text-base leading-relaxed"
          />

          {/* Attached Image Preview */}
          {imageDataUrl && (
            <div className="relative inline-block mt-2 pt-2 border-t border-[#e2e3e0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageDataUrl}
                alt="Selected problem attachment"
                className="h-20 w-24 object-cover rounded-lg border border-[#bec9c2]"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-1 -right-2 bg-white text-[#ba1a1a] border border-[#bec9c2] rounded-full p-1 hover:bg-[#ffdad6] shadow-sm transition-colors cursor-pointer"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Action Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#00513a] bg-[#dae5df]/60 hover:bg-[#dae5df] px-3.5 py-2 rounded-xl border border-[#bec9c2]/60 transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4 text-[#00513a]" />
              <span>{imageDataUrl ? 'Change photo' : 'Add photo'}</span>
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
              onClick={() => setShowLocationSelect(!showLocationSelect)}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#56615c] hover:text-[#00513a] bg-white hover:bg-[#f3f4f1] px-3.5 py-2 rounded-xl border border-[#bec9c2]/60 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#00513a]" />
              <span className="max-w-[140px] truncate">{location || 'Use demo location'}</span>
            </button>
          </div>

          <span className="text-[11px] text-[#56615c] font-medium hidden sm:inline">
            Fast • Secure • Bilingual
          </span>
        </div>

        {/* Location Dropdown selector (when toggled or location clicked) */}
        {showLocationSelect && (
          <div className="bg-[#f3f4f1] p-3 rounded-xl border border-[#bec9c2]/50 mb-4 animate-in fade-in duration-200">
            <label className="block text-xs font-bold text-[#00513a] mb-1.5">
              Select City / Locality:
            </label>
            <div className="flex items-center gap-2">
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowLocationSelect(false);
                }}
                className="w-full bg-white text-sm border border-[#bec9c2] rounded-lg px-3 py-2 text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a]"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowLocationSelect(false)}
                className="px-3 py-2 text-xs font-semibold bg-white border border-[#bec9c2] rounded-lg text-[#56615c] hover:bg-[#e2e3e0]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Validation Error */}
        {error && (
          <div className="flex items-center gap-2 bg-[#ffdad6] text-[#93000a] text-xs md:text-sm font-medium px-3.5 py-2 rounded-xl mb-3.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#00513a] hover:bg-[#0d6b4f] text-white rounded-xl py-3.5 px-6 flex items-center justify-center gap-2 font-bold text-base md:text-lg shadow-sm hover:shadow transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>SheharSuno is understanding your report...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-[#a1f3cf]" />
              <span>Analyze My Report</span>
            </>
          )}
        </button>
      </div>

      {/* "Try a demo" Section with 3 clickable chips */}
      <div className="bg-[#dae5df]/40 rounded-2xl p-4 md:p-5 border border-[#bec9c2]/50">
        <div className="flex items-center gap-2 mb-2.5">
          <Sparkles className="w-4 h-4 text-[#00513a]" />
          <h3 className="text-xs md:text-sm font-bold text-[#00513a] uppercase tracking-wider">
            Try a demo (One-click scenarios)
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {demoChips.map((chip, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#00513a] text-[#00513a] hover:text-white border border-[#bec9c2]/70 text-xs md:text-sm font-semibold px-3.5 py-2 rounded-full shadow-2xs hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              <span>{chip.label}</span>
              <span className="text-[10px] opacity-70">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
