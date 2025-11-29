import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const fanytelToken = process.env.FANYTEL_TOKEN; // JWT from .env

    if (!fanytelToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const response = await fetch("https://fanytel.com/api/balance", {
      headers: {
        Authorization: `Bearer ${fanytelToken}`,
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(message);
    return res.status(500).json({ error: "BALANCE_FETCH_FAILED", details: message });
  }
}
