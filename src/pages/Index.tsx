import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { WelcomeScreen } from "@/components/home/WelcomeScreen";
import { AppShell } from "@/components/layout/AppShell";
import { BalanceCard } from "@/components/home/BalanceCard";
import { DashboardNumber } from "@/components/home/DashboardNumber";
import { DialPad } from "@/components/call/DialPad";
import { CallHistory } from "@/components/history/CallHistory";
import { SMSView } from "@/components/sms/SMSView";
import { IncomingCallModal } from "@/components/incoming/IncomingCallModal";
import { IncomingSMSNotification } from "@/components/incoming/IncomingSMSNotification";
import { useToast } from "@/hooks/use-toast";

// 🔑 Import service layer functions that talk to JWT-protected backend
import { makeCall, getIncomingCalls } from "@/services/call";
import { sendSMS } from "@/services/sms";

type Tab = "call" | "history" | "sms";

const DASHBOARD_NUMBER = "+1 579 900 5133";

const Index = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("call");
  const [balance, setBalance] = useState("$0.06");
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
      title: t("toast.welcome"),
      description: t("toast.welcomeDesc"),
    });
  };

  // ✅ Outbound call using JWT-protected backend
  const handleCall = async (number: string) => {
    toast({
      title: t("toast.calling"),
      description: t("toast.callingDesc", { number }),
    });
    try {
      const result = await makeCall(number); // calls /api/call/out
      console.log("Call initiated:", result);
    } catch (err: any) {
      toast({ title: "Error", description: err.message });
    }
  };

  const handleCallBack = (number: string) => {
    setActiveTab("call");
    toast({
      title: t("toast.readyToCall"),
      description: t("toast.readyToCallDesc", { number }),
    });
  };

  // ✅ Accept incoming call
  const handleAcceptCall = () => {
    setIncomingCall({ isOpen: false, callerNumber: "" });
    toast({
      title: "Call connected",
      description: `Connected with ${
        incomingCall.callerName || incomingCall.callerNumber
      }`,
    });
  };

  const handleRejectCall = () => {
    setIncomingCall({ isOpen: false, callerNumber: "" });
  };

  // ✅ SMS handling
  const handleViewSMS = () => {
    setIncomingSMS({ isOpen: false, senderNumber: "", messagePreview: "" });
    setActiveTab("sms");
  };

  const handleDismissSMS = () => {
    setIncomingSMS({ isOpen: false, senderNumber: "", messagePreview: "" });
  };

  // ✅ Poll incoming calls (JWT-protected /api/call/in)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        const calls = await getIncomingCalls();
        if (calls.length > 0) {
          setIncomingCall({
            isOpen: true,
            callerNumber: calls[0].callerNumber,
            callerName: calls[0].callerName,
          });
        }
      } catch (err) {
        console.error("Incoming call check failed:", err);
      }
    }, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, [isAuthenticated]);

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

