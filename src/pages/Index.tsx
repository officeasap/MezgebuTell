import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { WelcomeScreen } from "@/components/home/WelcomeScreen";
import { AppShell } from "@/components/layout/AppShell";
import { BalanceCard } from "@/components/home/BalanceCard";
import { DashboardNumber } from "@/components/home/DashboardNumber";
import { DialPad } from "@/components/call/DialPad";
import { CallHistory } from "@/components/history/CallHistory";
import { SMSView } from "@/components/sms/SMSView";
import { BuyCredits } from "@/components/account/BuyCredits";
import { IncomingCallModal } from "@/components/incoming/IncomingCallModal";
import { IncomingSMSNotification } from "@/components/incoming/IncomingSMSNotification";
import { useToast } from "@/hooks/use-toast";

type Tab = "call" | "history" | "sms" | "account";

const DASHBOARD_NUMBER = "+1 579 900 5133";

const Index = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("call");
  const [balance] = useState("$0.06");
  const { toast } = useToast();

  // Incoming call state
  const [incomingCall, setIncomingCall] = useState<{
    isOpen: boolean;
    callerName?: string;
    callerNumber: string;
  }>({ isOpen: false, callerNumber: "" });

  // Incoming SMS state
  const [incomingSMS, setIncomingSMS] = useState<{
    isOpen: boolean;
    senderName?: string;
    senderNumber: string;
    messagePreview: string;
  }>({ isOpen: false, senderNumber: "", messagePreview: "" });

  const handleStart = () => {
    setIsAuthenticated(true);
    toast({
      title: t('toast.welcome'),
      description: t('toast.welcomeDesc'),
    });
  };

  const handleCall = (number: string) => {
    toast({
      title: t('toast.calling'),
      description: t('toast.callingDesc', { number }),
    });
  };

  const handleCallBack = (number: string) => {
    setActiveTab("call");
    toast({
      title: t('toast.readyToCall'),
      description: t('toast.readyToCallDesc', { number }),
    });
  };

  // Demo: Simulate incoming call after 10 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const timer = setTimeout(() => {
      setIncomingCall({
        isOpen: true,
        callerName: "John Doe",
        callerNumber: "+1 555 0999"
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // Demo: Simulate incoming SMS after 15 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const timer = setTimeout(() => {
      setIncomingSMS({
        isOpen: true,
        senderName: "Jane Smith",
        senderNumber: "+1 555 0888",
        messagePreview: "Hi! Just wanted to check if you're free for a meeting tomorrow at 3pm?"
      });
    }, 15000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const handleAcceptCall = () => {
    setIncomingCall({ isOpen: false, callerNumber: "" });
    toast({
      title: "Call connected",
      description: `Connected with ${incomingCall.callerName || incomingCall.callerNumber}`,
    });
  };

  const handleRejectCall = () => {
    setIncomingCall({ isOpen: false, callerNumber: "" });
  };

  const handleViewSMS = () => {
    setIncomingSMS({ isOpen: false, senderNumber: "", messagePreview: "" });
    setActiveTab("sms");
  };

  const handleDismissSMS = () => {
    setIncomingSMS({ isOpen: false, senderNumber: "", messagePreview: "" });
  };

  if (!isAuthenticated) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <>
      <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="px-4 pt-4">
          <DashboardNumber number={DASHBOARD_NUMBER} />
        </div>
        <BalanceCard balance={balance} />
        
        {activeTab === "call" && <DialPad onCall={handleCall} />}
        {activeTab === "history" && <CallHistory onCallBack={handleCallBack} />}
        {activeTab === "sms" && <SMSView />}
        {activeTab === "account" && <BuyCredits />}
      </AppShell>

      {/* Incoming Call Modal */}
      <IncomingCallModal
        isOpen={incomingCall.isOpen}
        callerName={incomingCall.callerName}
        callerNumber={incomingCall.callerNumber}
        onAccept={handleAcceptCall}
        onReject={handleRejectCall}
      />

      {/* Incoming SMS Notification */}
      <IncomingSMSNotification
        isOpen={incomingSMS.isOpen}
        senderName={incomingSMS.senderName}
        senderNumber={incomingSMS.senderNumber}
        messagePreview={incomingSMS.messagePreview}
        onView={handleViewSMS}
        onDismiss={handleDismissSMS}
      />
    </>
  );
};

export default Index;
