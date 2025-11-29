import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Step 1: Extract Gmail OAuth token from frontend
    const { gmailToken } = req.body as { gmailToken: string };

    if (!gmailToken) {
      return res.status(400).json({ error: "Missing Gmail token" });
    }

    // Step 2: Exchange Gmail token with Fanytel for a session token
    const response = await fetch("https://fanytel.com/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: gmailToken }),
    });

    if (!response.ok) {
      throw new Error("Fanytel auth failed");
    }

    const data = await response.json();

    // Step 3: Store Fanytel token securely in cookie
    res.setHeader(
      "Set-Cookie",
      `fanytelToken=${data.token}; HttpOnly; Path=/; Secure; SameSite=Strict`
    );

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(message);
    return res.status(500).json({ error: "AUTH_ERROR", details: message });
  }
}
