import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails/my-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const response = await req.json();
    const { data } = response;

    if (!data?.Email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        await resend.emails.send({
            from: 'Doctor-Appointment-Booking-App@tubeguruji-app.tubeguruji.com',
            to: [data.Email], // Ensure `Email` exists
            subject: 'Doctor-Appointment-Booking Confirmation',
            react: EmailTemplate({ response: data }), // Pass data to EmailTemplate
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
