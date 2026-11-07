// Vercel serverless endpoint for private JARVIS chat.
// Set OPENAI_API_KEY in the Vercel project environment variables.
// The key is never sent to the browser.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "JARVIS AI is not configured on the server yet." });
  }
  try {
    const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const messages = incoming
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-12)
      .map(m => ({ role: m.role, content: m.content.slice(0, 5000) }));
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return res.status(400).json({ error: "A user message is required." });
    }
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{
          role: "system",
          content: "You are JARVIS, a helpful, natural conversational assistant inside the user's Winter Arc OS app. Speak clearly and casually in British English. Hold context across turns, answer follow-up questions naturally, and do not require rigid commands. Help with GCSE learning, revision planning, habits and everyday questions. The user is a teenager: keep advice age-appropriate and safe. Never claim you can see live device data unless it is included in the conversation. Keep replies concise but useful."
        }, ...messages],
        temperature: 0.7,
        max_tokens: 700
      })
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI API error", upstream.status, data?.error?.message);
      return res.status(502).json({ error: "The AI provider could not complete that message." });
    }
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return res.status(502).json({ error: "The AI returned no reply." });
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("JARVIS chat error", error);
    return res.status(500).json({ error: "JARVIS could not process that message." });
  }
}
