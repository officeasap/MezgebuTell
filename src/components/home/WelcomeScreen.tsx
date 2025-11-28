import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    if (!termsAccepted) return;
    setIsLoading(true);
    // Simulate auth call - in production this would call POST /auth/start
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onStart();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Logo Placeholder */}
      <div className="logo-placeholder w-32 h-32 flex items-center justify-center mb-8 animate-scale-in">
        <Phone className="w-16 h-16 text-primary icon-shadow" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 animate-fade-in">
        MEZGEBU PHONE
      </h1>
      <p className="text-muted-foreground text-center mb-12 animate-fade-in">
        Premium calling experience
      </p>

      {/* Terms Checkbox */}
      <div className="flex items-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground cursor-pointer select-none"
        >
          Click to accept our terms
        </label>
      </div>

      {/* Start Button */}
      <Button
        variant="hero"
        size="xl"
        onClick={handleStart}
        disabled={!termsAccepted || isLoading}
        className="w-full max-w-xs animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Connecting...
          </span>
        ) : (
          "START"
        )}
      </Button>

      {/* Footer */}
      <p className="text-xs text-muted-foreground/60 mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        Secure • Private • Premium
      </p>
    </div>
  );
}
