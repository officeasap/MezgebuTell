export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { toNumber, message } = req.body;
    const cookies = req.headers.cookie || "";
    const tokenMatch = cookies.match(/fanytelToken=([^;]+)/);
    const fanytelToken = tokenMatch ? tokenMatch[1] : null;

    if (!fanytelToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const response = await fetch("https://fanytel.com/api/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fanytelToken}`,
      },
      body: JSON.stringify({ to: toNumber, message }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "sms_error" });
  }
}
