import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const fanytelToken = process.env.FANYTEL_TOKEN;

    const response = await fetch("https://fanytel.com/api/call/in", {
      headers: { Authorization: `Bearer ${fanytelToken}` },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: "CALL_IN_FAILED", details: message });
  }
}
