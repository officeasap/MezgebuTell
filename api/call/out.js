// api/call/out.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { toNumber } = req.body;
    const fanytelToken = process.env.FANYTEL_TOKEN; // JWT from .env

    if (!fanytelToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const response = await fetch("https://fanytel.com/api/call/out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fanytelToken}`,
      },
      body: JSON.stringify({ to: toNumber }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "CALL_OUT_FAILED", details: err.message });
  }
}
