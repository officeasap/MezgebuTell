export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const fanytelToken = process.env.FANYTEL_TOKEN;
    const response = await fetch("https://fanytel.com/api/sms/inbox", {
      headers: { Authorization: `Bearer ${fanytelToken}` }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SMS_INBOX_FAILED", details: err.message });
  }
}
