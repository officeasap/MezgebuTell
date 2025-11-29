// api/call/reject.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { callId } = req.body;
    const fanytelToken = process.env.FANYTEL_TOKEN; // JWT from .env

    if (!fanytelToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const response = await fetch("https://fanytel.com/api/call/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fanytelToken}`,
      },
      body: JSON.stringify({ callId }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "CALL_REJECT_FAILED", details: err.message });
  }
}
