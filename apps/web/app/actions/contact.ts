'use server';

import { z } from 'zod';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const CONTACT_RECIPIENT = process.env.CONTACT_EMAIL ?? 'innovacionesmadfam@proton.me';
const RESEND_FROM = process.env.RESEND_FROM_EMAIL ?? 'Primavera3D <noreply@primavera3d.com>';

async function sendEmailViaResend(data: ContactFormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      '[contact] RESEND_API_KEY is not set — skipping email send. Form data logged below.',
    );
    console.log('[contact] Submission (no-send):', {
      name: data.name,
      email: data.email,
      subject: data.subject,
    });
    return;
  }

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    <p><strong>Subject:</strong> ${data.subject}</p>
    <hr />
    <p>${data.message.replace(/\n/g, '<br />')}</p>
  `.trim();

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [CONTACT_RECIPIENT],
      reply_to: data.email,
      subject: `Contact Form: ${data.subject}`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[contact] Resend API error:', res.status, body);
    throw new Error(`Email service returned ${res.status}`);
  }
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResponse> {
  try {
    // Parse and validate form data
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const validatedData = contactSchema.parse(rawData);

    await sendEmailViaResend(validatedData);

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });

      return {
        success: false,
        message: 'Please correct the errors in the form.',
        errors,
      };
    }

    console.error('[contact] Form submission error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    };
  }
}