'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  first_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.first_name,
          email: data.email,
          message: data.message,
          source_form: 'contact_form',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skontaktuj Się z Nami</h1>
          <p className="text-neutral-gray text-lg">
            Jesteśmy tu, aby odpowiedzieć na Twoje pytania o roboty humanoidalne
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-6">Informacje Kontaktowe</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:kontakt@eurobothub.com" className="text-neutral-gray hover:text-accent transition-colors">
                      kontakt@eurobothub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Lokalizacja</h3>
                    <p className="text-neutral-gray">Warszawa, Polska</p>
                    <p className="text-neutral-gray text-sm">Obsługujemy całą Europę</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Godziny Pracy</h3>
                    <p className="text-neutral-gray">Pon - Pią: 9:00 - 18:00</p>
                    <p className="text-neutral-gray">Weekendy: Zamknięte</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Social Media</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-primary-dark rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-all group">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-primary-dark rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-primary-dark rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Wyślij Wiadomość</h2>
              
              {submitStatus === 'success' ? (
                <div className="bg-accent/10 border border-accent rounded-lg p-6 text-center">
                  <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-accent font-semibold text-lg mb-2">
                    Dziękujemy za kontakt!
                  </h3>
                  <p className="text-neutral-gray">
                    Odpowiemy w ciągu 24 godzin.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium mb-2">
                      Imię i Nazwisko *
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      {...register('first_name')}
                      className={`w-full px-4 py-3 bg-primary border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none ${
                        errors.first_name ? 'border-red-500' : 'border-neutral-gray/30'
                      }`}
                    />
                    {errors.first_name && (
                      <p className="mt-2 text-sm text-red-400">{errors.first_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 bg-primary border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none ${
                        errors.email ? 'border-red-500' : 'border-neutral-gray/30'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Wiadomość *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message')}
                      className={`w-full px-4 py-3 bg-primary border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none resize-none ${
                        errors.message ? 'border-red-500' : 'border-neutral-gray/30'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij Wiadomość'}
                  </button>

                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center">
                      Wystąpił błąd. Spróbuj ponownie.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
