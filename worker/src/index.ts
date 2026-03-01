import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

const ALLOWED_ORIGINS = ["https://majalabs.net"];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow localhost on any port for development
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  return false;
}

function corsHeaders(origin: string | null) {
  const allowedOrigin = isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers }
      );
    }

    let body: { name?: string; email?: string; message?: string };
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid request body" },
        { status: 400, headers }
      );
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400, headers }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400, headers }
      );
    }

    try {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Maja Labs Contact <contact@majalabs.net>",
        to: env.CONTACT_EMAIL,
        replyTo: email,
        subject: `Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });

      return Response.json({ success: true }, { headers });
    } catch {
      return Response.json(
        { error: "Failed to send message. Please try again." },
        { status: 500, headers }
      );
    }
  },
};
