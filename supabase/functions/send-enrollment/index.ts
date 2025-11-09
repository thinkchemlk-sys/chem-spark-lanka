import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EnrollmentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  medium: string;
  callDate?: string;
  callTime?: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, medium, callDate, callTime, notes }: EnrollmentRequest = await req.json();

    console.log("Processing enrollment for:", email);

    // Send email to thinkchemlk@gmail.com
    const emailResponse = await resend.emails.send({
      from: "ThinkChem Enrollment <onboarding@resend.dev>",
      to: ["thinkchemlk@gmail.com"],
      subject: `New Enrollment Application - ${firstName} ${lastName}`,
      html: `
        <h2>New Student Enrollment Application</h2>
        <hr />
        <h3>Student Information:</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Medium:</strong> ${medium}</p>
        ${callDate ? `<p><strong>Preferred Call Date:</strong> ${callDate}</p>` : ''}
        ${callTime ? `<p><strong>Preferred Call Time:</strong> ${callTime} (Sri Lankan Time)</p>` : ''}
        ${notes ? `<h3>Student Notes:</h3><p>${notes}</p>` : ''}
        <hr />
        <p style="color: #666; font-size: 12px;">Received: ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-enrollment function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
