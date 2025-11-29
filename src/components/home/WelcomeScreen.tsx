import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageToggle } from "@/components/LanguageToggle";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onStart();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-background to-background-secondary">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      {/* Logo Frame with Official MEZGEBU Logo */}
      <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-8 shadow-signature-lg">
        <img
          src="/meZgebu1.png"
          alt="MEZGEBU Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2 text-center">
        {t("app.name")}
      </h1>
      <p className="text-muted-foreground text-center mb-8 max-w-xs">
        {t("welcome.subtitle")}
      </p>

     {/* Terms Checkbox */}
<div className="flex items-center space-x-3 mb-6">
  <Checkbox
    id="terms"
    checked={accepted}
    onCheckedChange={(checked) => setAccepted(checked === true)}
    className="border-border 
               data-[state=checked]:bg-[#2c2a2c] 
               data-[state=checked]:border-[#2c2a2c] 
               shadow-[0_2px_6px_#d3f5da]"
  />
  <label
    htmlFor="terms"
    className="text-sm text-muted-foreground cursor-pointer select-none"
  >
    {t("welcome.terms")}
  </label>
</div>

{/* Start Button - STABLE, sovereign styling */}
<Button
  variant="hero"
  size="lg"
  onClick={handleStart}
  disabled={!accepted || isLoading}
  className="w-full max-w-xs 
             bg-[#2c2a2c] 
             text-white 
             rounded-[18px] 
             shadow-[0_4px_10px_#d3f5da] 
             hover:bg-[#2c2a2c] 
             focus:ring-0 
             active:scale-100 
             transition-none"
>
  {isLoading ? (
    <>
      <Loader2 className="w-5 h-5 mr-2" /> {/* removed animate-spin */}
      {t("welcome.connecting")}
    </>
  ) : (
    t("welcome.start")
  )}
</Button>



      {/* Footer */}
      <div className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
        <Shield className="w-4 h-4 icon-shadow" />
        <span>{t("welcome.footer")}</span>
      </div>
    </div>
  );
}
