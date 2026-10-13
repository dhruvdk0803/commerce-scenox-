// One-time helper: connects your Google Calendar so the website assistant (Nox) can book calls.
// usage: node scripts/google-calendar-auth.mjs <CLIENT_ID> <CLIENT_SECRET>
// Prints GOOGLE_REFRESH_TOKEN to put in .env.production on the server. Run it on your own computer.
import http from "node:http";

const [clientId, clientSecret] = process.argv.slice(2);
if (!clientId || !clientSecret) {
  console.log("usage: node scripts/google-calendar-auth.mjs <CLIENT_ID> <CLIENT_SECRET>");
  process.exit(1);
}
const PORT = 53682;
const redirect = `http://127.0.0.1:${PORT}`;
const scope = ["https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.freebusy"].join(" ");
const url =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({ client_id: clientId, redirect_uri: redirect, response_type: "code", scope, access_type: "offline", prompt: "consent" });

console.log("\n1. Open this link in your browser and allow access with the Google account whose calendar takes bookings:\n");
console.log(url, "\n");

http
  .createServer(async (req, res) => {
    const code = new URL(req.url, redirect).searchParams.get("code");
    if (!code) { res.end("No code received."); return; }
    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirect, grant_type: "authorization_code" }),
    });
    const j = await r.json();
    if (!j.refresh_token) {
      res.end("Google did not return a refresh token. Check the terminal.");
      console.log("\nNo refresh token returned:", JSON.stringify(j));
      process.exit(1);
    }
    res.end("Connected. You can close this tab and go back to the terminal.");
    console.log("2. Done. Add these lines to .env.production on the server:\n");
    console.log(`GOOGLE_CLIENT_ID=${clientId}`);
    console.log(`GOOGLE_CLIENT_SECRET=${clientSecret}`);
    console.log(`GOOGLE_REFRESH_TOKEN=${j.refresh_token}\n`);
    process.exit(0);
  })
  .listen(PORT, "127.0.0.1", () => console.log(`Waiting for Google on ${redirect} ...`));
