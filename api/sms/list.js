// api/sms/list.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const fanytelToken = process.env.FANYTEL_TOKEN; // JWT from .env

    if (!fanytelToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Call Fanytel backend to fetch SMS inbox/history
    const response = await fetch("https://fanytel.com/api/sms/list", {
      headers: {
        Authorization: `Bearer ${fanytelToken}`,
      },
    });

    const data = await response.json();

    // Return standardized list to frontend
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SMS_LIST_FAILED", details: err.message });
  }
}
