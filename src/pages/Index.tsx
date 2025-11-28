import { useState } from "react";
import { WelcomeScreen } from "@/components/home/WelcomeScreen";
import { AppShell } from "@/components/layout/AppShell";
import { BalanceCard } from "@/components/home/BalanceCard";
import { DialPad } from "@/components/call/DialPad";
import { CallHistory } from "@/components/history/CallHistory";
import { SMSView } from "@/components/sms/SMSView";
import { BuyCredits } from "@/components/account/BuyCredits";
import { useToast } from "@/hooks/use-toast";

type Tab = "call" | "history" | "sms" | "account";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("call");
  const [balance] = useState("$0.06");
  const { toast } = useToast();

  const handleStart = () => {
    setIsAuthenticated(true);
    toast({
      title: "Welcome to MEZGEBU PHONE",
      description: "You're now connected and ready to make calls.",
    });
  };

  const handleCall = (number: string) => {
    toast({
      title: "Initiating call",
      description: `Calling ${number}...`,
    });
    // In production: POST /call/start { toNumber }
  };

  const handleCallBack = (number: string) => {
    setActiveTab("call");
    // Could pre-fill the dial pad with the number
    toast({
      title: "Ready to call",
      description: `Dial pad ready for ${number}`,
    });
  };

  if (!isAuthenticated) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      <BalanceCard balance={balance} />
      
      {activeTab === "call" && <DialPad onCall={handleCall} />}
      {activeTab === "history" && <CallHistory onCallBack={handleCallBack} />}
      {activeTab === "sms" && <SMSView />}
      {activeTab === "account" && <BuyCredits />}
    </AppShell>
  );
};

export default Index;
