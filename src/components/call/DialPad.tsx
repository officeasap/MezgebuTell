import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Phone, PhoneOff, Delete, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialPadProps {
  onCall: (number: string) => void;
}

const dialPadButtons = [
  { digit: "1", letters: "" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
  { digit: "*", letters: "" },
  { digit: "0", letters: "+" },
  { digit: "#", letters: "" },
];

const recentNumbers = ["+1 555 0123", "+1 555 0456", "+1 555 0789"];

export function DialPad({ onCall }: DialPadProps) {
  const { t } = useTranslation();
  const [number, setNumber] = useState("");
  const [isInCall, setIsInCall] = useState(false);

  const handleDigit = (digit: string) => {
    if (!isInCall) {
      setNumber((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number.length > 0) {
      setIsInCall(true);
      onCall(number);
    }
  };

  const handleEndCall = () => {
    setIsInCall(false);
  };

  const handleRecent = (recentNumber: string) => {
    setNumber(recentNumber.replace(/\s/g, ""));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Number Display */}
      <div className="frame-glossy rounded-xl p-4 min-h-[72px] flex items-center justify-center">
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={t('dialpad.placeholder')}
          className="w-full text-center text-2xl font-bold bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          readOnly={isInCall}
        />
      </div>

      {/* Recent Calls */}
      {!isInCall && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium px-1">
            {t('dialpad.recentCalls')}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {recentNumbers.map((recentNum, index) => (
              <button
                key={index}
                onClick={() => handleRecent(recentNum)}
                className="flex items-center gap-2 px-3 py-2 bg-secondary/60 rounded-lg text-sm text-foreground whitespace-nowrap hover:bg-secondary/80 transition-colors min-h-[44px]"
              >
                <RotateCcw className="w-3 h-3 text-muted-foreground" />
                {recentNum}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dial Pad Grid */}
      <div className="grid grid-cols-3 gap-3">
        {dialPadButtons.map(({ digit, letters }) => (
          <button
            key={digit}
            onClick={() => handleDigit(digit)}
            disabled={isInCall}
            className={cn(
              "dial-button aspect-square rounded-full flex flex-col items-center justify-center",
              "bg-secondary/60 text-foreground shadow-signature",
              "hover:bg-secondary/80 hover:scale-105 active:scale-95",
              "transition-all duration-150 min-h-[64px]",
              isInCall && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="text-2xl font-semibold">{digit}</span>
            {letters && (
              <span className="text-[10px] text-muted-foreground tracking-widest">
                {letters}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-center gap-6 pt-2">
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={number.length === 0 || isInCall}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center",
            "bg-secondary/40 text-foreground transition-all min-h-[56px]",
            "hover:bg-secondary/60 active:scale-95",
            (number.length === 0 || isInCall) && "opacity-30 cursor-not-allowed"
          )}
        >
          <Delete className="w-6 h-6" />
        </button>

        {/* Call/End Button */}
        {isInCall ? (
          <button
            onClick={handleEndCall}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              "bg-destructive text-foreground shadow-signature min-h-[64px]",
              "hover:bg-destructive/90 active:scale-95 transition-all"
            )}
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        ) : (
          <button
            onClick={handleCall}
            disabled={number.length === 0}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              "bg-primary text-foreground shadow-signature min-h-[64px]",
              "hover:bg-primary-glow active:scale-95 transition-all",
              number.length === 0 && "opacity-50 cursor-not-allowed"
            )}
          >
            <Phone className="w-7 h-7" />
          </button>
        )}

        {/* Spacer for symmetry */}
        <div className="w-14 h-14" />
      </div>
    </div>
  );
}
