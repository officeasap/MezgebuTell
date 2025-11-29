import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { callId } = req.body as { callId: string };
    const fanytelToken = process.env.FANYTEL_TOKEN;

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
    return res.status(response.status).json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: "CALL_REJECT_FAILED", details: message });
  }
}
