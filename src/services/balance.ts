// services/balance.ts

export async function getBalance() {
  const res = await fetch("/api/balance");
  if (!res.ok) throw new Error(`Balance fetch failed: ${res.status}`);
  return res.json();
}
