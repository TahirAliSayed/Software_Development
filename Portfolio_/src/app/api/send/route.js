import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Use environment variable
const fromEmail = process.env.RESEND_VERIFIED_EMAIL; // Use verified email

export async function POST(req) {
  const { email, subject, message } = await req.json();
  
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: ['sdark512@gmail.com'], // Your receiving email
      reply_to: email, // Optional: Set reply-to address
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message from: {email}</p>
          <p>{message}</p>
        </>
      ),
    });

    console.log("Email sent:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}