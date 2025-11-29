import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Phone, PhoneOff, Delete } from "lucide-react";
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

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Dashboard Info */}
      <div className="px-4 pt-4 space-y-3">
        {/* Your Number */}
        <div className="flex items-center gap-2">
          
          <div>
           
          </div>
        </div>

        {/* Available Balance */}
        <div className="flex items-center gap-2">
          
          <div>
           




          </div>
        </div>
      </div>

      {/* Dial Pad Centered */}
      <div className="flex-1 flex flex-col items-center justify-center mt-[-6]">
        {/* Number Display */}
        <div className="rounded-xl p-3 min-h-[56px] flex items-center justify-center mb-6">
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={t("dialpad.placeholder")}
            className="w-full text-center text-xl font-bold bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            readOnly={isInCall}
          />
        </div>

        {/* Dial Pad Grid */}
        <div className="grid grid-cols-3 gap-4">
          {dialPadButtons.map(({ digit, letters }) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              disabled={isInCall}
              className={cn(
                "rounded-full flex flex-col items-center justify-center",
                "bg-secondary/60 text-foreground",
                "hover:bg-secondary/80 active:scale-95 transition-all duration-150",
                "w-20 h-20 shadow-[0_3px_6px_#d3f5da]", // widened buttons
                isInCall && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="text-xl font-semibold">{digit}</span>
              {letters && (
                <span className="text-[9px] text-muted-foreground tracking-widest">
                  {letters}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={number.length === 0 || isInCall}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              "bg-secondary/60 text-foreground transition-all",
              "hover:bg-secondary/80 active:scale-95 shadow-[0_3px_6px_#d3f5da]",
              (number.length === 0 || isInCall) && "opacity-30 cursor-not-allowed"
            )}
          >
            <Delete className="w-5 h-5" />
          </button>

          {/* Call/End Button */}
          {isInCall ? (
            <button
              onClick={handleEndCall}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                "bg-destructive text-foreground",
                "hover:bg-destructive/90 active:scale-95 transition-all shadow-[0_3px_6px_#d3f5da]"
              )}
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={handleCall}
              disabled={number.length === 0}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                "bg-primary text-foreground",
                "hover:bg-primary-glow active:scale-95 transition-all shadow-[0_3px_6px_#d3f5da]",
                number.length === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              <Phone className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
