// src/services/sms.ts

export async function sendSMS(toNumber: string, message: string) {
  const res = await fetch("/api/sms/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toNumber, message }),
  });
  if (!res.ok) throw new Error(`SMS send failed: ${res.status}`);
  return res.json();
}

export async function getInbox() {
  const res = await fetch("/api/sms/list");
  if (!res.ok) throw new Error(`Inbox fetch failed: ${res.status}`);
  return res.json();
}
