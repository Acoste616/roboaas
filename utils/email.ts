// Email utility functions
// Using Resend API for email sending

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

interface LeadData {
  email: string;
  first_name?: string;
  source_form: string;
  use_case?: string;
  budget_range?: string;
  timeline?: string;
  country?: string;
}

export async function sendReportEmail(email: string, firstName?: string) {
  if (!RESEND_API_KEY) {
    console.log('[MOCK Email] Would send report email with PDF to:', email);
    return { success: true, mock: true };
  }

  try {
    // Read PDF file from public directory
    const fs = require('fs');
    const path = require('path');
    const pdfPath = path.join(process.cwd(), 'public', 'pdf', 'Robot_Security_Report_2026_PL.pdf');
    
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = fs.readFileSync(pdfPath);
    } catch (error) {
      console.error('[Email] PDF file not found:', pdfPath);
      console.error('[Email] Sending email without attachment');
    }

    const emailPayload: any = {
      from: 'EuroBot Hub <raporty@eurobothub.com>',
      to: email,
      subject: 'Twój Raport: Bezpieczeństwo Robotów i GDPR 2026',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00FF88;">Dziękujemy ${firstName || ''}!</h1>
          <p>Oto Twój raport ekspercki o bezpieczeństwie robotów humanoidalnych i zgodności z GDPR.</p>
          <p><strong>W załączniku PDF znajdziesz szczegółową analizę:</strong></p>
          <ul>
            <li>Wymagania GDPR dla robotów domowych</li>
            <li>EU AI Act - co musisz wiedzieć w 2026 roku</li>
            <li>Bezpieczeństwo danych osobowych i prywatność</li>
            <li>Case studies z Europy (Berlin, Warszawa, Monachium)</li>
            <li>Checklista bezpiecznego zakupu</li>
          </ul>
          <p style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #00FF88;">
            💡 <strong>Potrzebujesz pomocy w wyborze robota?</strong><br>
            Nasi eksperci są dostępni 24/7. Odpowiedz na tego maila lub odwiedź 
            <a href="https://eurobothub.com/kontakt" style="color: #00FF88;">eurobothub.com/kontakt</a>
          </p>
          <p>Pozdrawiamy,<br><strong>Zespół EuroBot Hub</strong></p>
        </div>
      `
    };

    // Add PDF attachment if file exists
    if (pdfBuffer) {
      emailPayload.attachments = [
        {
          filename: 'Robot_Security_Report_2026_PL.pdf',
          content: pdfBuffer.toString('base64')
        }
      ];
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return { success: true };
  } catch (error) {
    console.error('[Email] Error sending report:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotification(leadData: LeadData) {
  if (!RESEND_API_KEY) {
    console.log('[MOCK Email] Would send admin notification for lead:', leadData.email);
    return { success: true, mock: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'EuroBot Hub <system@eurobothub.com>',
        to: 'admin@eurobothub.com',
        subject: `Nowy Lead: ${leadData.source_form}`,
        html: `
          <h2>Nowy Lead!</h2>
          <p><strong>Email:</strong> ${leadData.email}</p>
          ${leadData.first_name ? `<p><strong>Imię:</strong> ${leadData.first_name}</p>` : ''}
          ${leadData.country ? `<p><strong>Kraj:</strong> ${leadData.country}</p>` : ''}
          ${leadData.use_case ? `<p><strong>Zastosowanie:</strong> ${leadData.use_case}</p>` : ''}
          ${leadData.budget_range ? `<p><strong>Budżet:</strong> ${leadData.budget_range}</p>` : ''}
          ${leadData.timeline ? `<p><strong>Termin:</strong> ${leadData.timeline}</p>` : ''}
          <p><strong>Źródło:</strong> ${leadData.source_form}</p>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send admin notification');
    }

    return { success: true };
  } catch (error) {
    console.error('[Email] Error sending admin notification:', error);
    return { success: false, error };
  }
}

export async function sendContactConfirmation(email: string, firstName?: string) {
  if (!RESEND_API_KEY) {
    console.log('[MOCK Email] Would send contact confirmation to:', email);
    return { success: true, mock: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'EuroBot Hub <kontakt@eurobothub.com>',
        to: email,
        subject: 'Potwierdzenie kontaktu - EuroBot Hub',
        html: `
          <h1>Dziękujemy ${firstName || ''}!</h1>
          <p>Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą w ciągu 24 godzin roboczych.</p>
          <p>Nasz zespół ekspertów jest gotowy, aby odpowiedzieć na wszystkie Twoje pytania dotyczące robotów humanoidalnych.</p>
          <p>W międzyczasie, możesz:</p>
          <ul>
            <li>Przeczytać naszego <a href="https://eurobothub.com/blog">bloga</a> z case studies</li>
            <li>Porównać <a href="https://eurobothub.com/sklep">modele robotów</a></li>
            <li>Pobrać <a href="https://eurobothub.com#report-form">raport ekspercki GDPR 2026</a></li>
          </ul>
          <p>Do szybkiego kontaktu!</p>
          <p><strong>EuroBot Hub Team</strong></p>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('[Email] Error sending contact confirmation:', error);
    return { success: false, error };
  }
}

export async function sendAuditConfirmation(email: string, firstName?: string) {
  if (!RESEND_API_KEY) {
    console.log('[MOCK Email] Would send audit confirmation to:', email);
    return { success: true, mock: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'EuroBot Hub <audyt@eurobothub.com>',
        to: email,
        subject: 'Potwierdzenie zapytania o audyt - EuroBot Hub',
        html: `
          <h1>Dziękujemy ${firstName || ''}!</h1>
          <p>Otrzymaliśmy Twoje zgłoszenie i skontaktujemy się z Tobą w ciągu 24 godzin roboczych.</p>
          <p>Nasz ekspert przygotuje dla Ciebie:</p>
          <ul>
            <li>Bezpłatny audyt Twoich potrzeb</li>
            <li>Rekomendacje modeli robotów</li>
            <li>Wstępną kalkulację ROI</li>
            <li>Plan wdrożenia</li>
          </ul>
          <p>Do szybkiego kontaktu!</p>
          <p><strong>EuroBot Hub Team</strong></p>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('[Email] Error sending confirmation:', error);
    return { success: false, error };
  }
}
