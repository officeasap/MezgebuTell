export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Step 1: Redirect user to Fanytel's Gmail OAuth flow
    // In practice, your frontend will open Fanytel's login page
    // After Gmail confirms, Fanytel returns a token to your backend

    const { gmailToken } = req.body; // frontend sends Gmail OAuth token

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
    res.setHeader("Set-Cookie", `fanytelToken=${data.token}; HttpOnly; Path=/; Secure; SameSite=Strict`);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "auth_error" });
  }
}
