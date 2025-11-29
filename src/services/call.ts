// src/services/call.ts
// Service layer for call actions — talks to Next.js API routes

// Outbound call
export async function makeCall(toNumber: string) {
  const res = await fetch("/api/call/out", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toNumber }),
  });
  if (!res.ok) throw new Error(`Call failed: ${res.status}`);
  return res.json();
}

// Poll incoming calls
export async function getIncomingCalls() {
  const res = await fetch("/api/call/in");
  if (!res.ok) throw new Error(`Incoming call fetch failed: ${res.status}`);
  return res.json();
}

// Accept incoming call
export async function acceptCall(callId: string) {
  const res = await fetch("/api/call/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callId }),
  });
  if (!res.ok) throw new Error(`Accept call failed: ${res.status}`);
  return res.json();
}

// Reject incoming call
export async function rejectCall(callId: string) {
  const res = await fetch("/api/call/reject", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callId }),
  });
  if (!res.ok) throw new Error(`Reject call failed: ${res.status}`);
  return res.json();
}
