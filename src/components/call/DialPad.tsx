import { useState } from "react";
import { Phone, Delete, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";

const dialKeys = [
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

interface DialPadProps {
  onCall: (number: string) => void;
}

export function DialPad({ onCall }: DialPadProps) {
  const [number, setNumber] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);

  const handleDigitPress = (digit: string) => {
    if (!isCallActive) {
      setNumber((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number.length > 0 && !isCallActive) {
      setIsCallActive(true);
      onCall(number);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
  };

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {/* Display */}
      <div className="w-full mb-6">
        <div className="frame-glossy p-4 min-h-[60px] flex items-center justify-center">
          <span className={cn(
            "text-2xl font-semibold tracking-wider text-foreground transition-all",
            number ? "opacity-100" : "opacity-30"
          )}>
            {number || "Enter number"}
          </span>
        </div>
      </div>

      {/* Recent Calls Quick Access */}
      <div className="w-full mb-6">
        <p className="text-xs text-muted-foreground mb-2 px-1">Recent</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["+1 555 0123", "+1 555 0456", "+1 555 0789"].map((recent) => (
            <button
              key={recent}
              onClick={() => setNumber(recent.replace(/\s/g, ""))}
              className="frame-glossy px-3 py-2 text-sm text-foreground whitespace-nowrap hover:bg-secondary/50 transition-colors"
            >
              {recent}
            </button>
          ))}
        </div>
      </div>

      {/* Dial Pad */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {dialKeys.map((key) => (
          <button
            key={key.digit}
            onClick={() => handleDigitPress(key.digit)}
            className="dial-btn"
            disabled={isCallActive}
          >
            <span>{key.digit}</span>
            {key.letters && (
              <span className="text-[10px] text-muted-foreground tracking-widest">
                {key.letters}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleDelete}
          className="w-14 h-14 rounded-full bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-signature-sm"
          disabled={isCallActive || number.length === 0}
        >
          <Delete className="w-6 h-6" />
        </button>

        {!isCallActive ? (
          <button
            onClick={handleCall}
            className="dial-btn dial-btn-call w-16 h-16"
            disabled={number.length === 0}
          >
            <Phone className="w-7 h-7" />
          </button>
        ) : (
          <button
            onClick={handleEndCall}
            className="dial-btn dial-btn-end w-16 h-16"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        )}

        <div className="w-14 h-14" /> {/* Spacer for symmetry */}
      </div>

      {/* Call Status */}
      {isCallActive && (
        <div className="mt-6 animate-fade-in">
          <p className="text-primary text-sm font-medium animate-pulse">
            Calling {number}...
          </p>
        </div>
      )}
    </div>
  );
}
