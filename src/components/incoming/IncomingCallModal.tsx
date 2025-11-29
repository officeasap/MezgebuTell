import { acceptCall, rejectCall } from "@/services/call";

export function IncomingCallModal({ isOpen, callerName, callerNumber, onAccept, onReject }) {
  if (!isOpen) return null;

  async function handleAccept() {
    try {
      await acceptCall(callerNumber); // callId could be callerNumber or backend-provided ID
      onAccept();
    } catch (err) {
      console.error("Accept failed:", err);
    }
  }

  async function handleReject() {
    try {
      await rejectCall(callerNumber);
      onReject();
    } catch (err) {
      console.error("Reject failed:", err);
    }
  }

  return (
    <div className="modal">
      <h2>Incoming Call</h2>
      <p>{callerName || callerNumber}</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}
