'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const auditRequestSchema = z.object({
  first_name: z.string().optional(),
  email: z.string().email('Proszę podać prawidłowy adres email'),
  country: z.string().optional(),
  use_case: z.string().min(1, 'Proszę wybrać zastosowanie'),
  budget_range: z.string().min(1, 'Proszę wybrać budżet'),
  timeline: z.string().min(1, 'Proszę wybrać termin'),
  source_form: z.string()
});

type AuditRequestFormData = z.infer<typeof auditRequestSchema>;

interface AuditRequestFormProps {
  productName?: string;
}

export default function AuditRequestForm({ productName }: AuditRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AuditRequestFormData>({
    resolver: zodResolver(auditRequestSchema)
  });

  const onSubmit = async (data: AuditRequestFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-gradient-to-br from-accent/10 via-primary-light to-primary-light border-2 border-accent/30">
      <div className="mb-6">
        <h3 className="text-3xl font-bold mb-2 text-neutral-light">
          Bezpłatny Audyt Potrzeb
        </h3>
        <p className="text-neutral-gray">
          {productName 
            ? `Zainteresowany modelem ${productName}? Skontaktujemy się z Tobą w ciągu 24h.`
            : 'Wypełnij formularz, a nasz ekspert skontaktuje się z Tobą w ciągu 24h.'
          }
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-neutral-light mb-2">Dziękujemy!</h4>
            <p className="text-neutral-gray mb-6">
              Twoje zgłoszenie zostało przyjęte. Skontaktujemy się wkrótce.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="btn-secondary"
            >
              Wyślij kolejne zgłoszenie
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* First Name (Optional) */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-neutral-light mb-2">
                Imię <span className="text-neutral-gray text-xs">(opcjonalne)</span>
              </label>
              <input
                {...register('first_name')}
                type="text"
                id="first_name"
                className="w-full px-4 py-3 bg-primary-dark border border-neutral-gray/30 rounded-lg text-neutral-light placeholder-neutral-gray/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="Jan"
              />
            </div>

            {/* Email (Required) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-light mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`w-full px-4 py-3 bg-primary-dark border rounded-lg text-neutral-light placeholder-neutral-gray/50 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-neutral-gray/30 focus:border-accent focus:ring-accent/20'
                }`}
                placeholder="jan.kowalski@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Country (Optional) */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-neutral-light mb-2">
                Kraj <span className="text-neutral-gray text-xs">(opcjonalne)</span>
              </label>
              <select
                {...register('country')}
                id="country"
                className="w-full px-4 py-3 bg-primary-dark border border-neutral-gray/30 rounded-lg text-neutral-light focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              >
                <option value="">Wybierz kraj</option>
                <option value="PL">Polska</option>
                <option value="DE">Niemcy</option>
                <option value="FR">Francja</option>
                <option value="IT">Włochy</option>
                <option value="ES">Hiszpania</option>
                <option value="NL">Holandia</option>
                <option value="BE">Belgia</option>
                <option value="AT">Austria</option>
                <option value="CZ">Czechy</option>
                <option value="OTHER">Inny</option>
              </select>
            </div>

            {/* Use Case (Required) */}
            <div>
              <label htmlFor="use_case" className="block text-sm font-medium text-neutral-light mb-2">
                Zastosowanie <span className="text-red-400">*</span>
              </label>
              <select
                {...register('use_case')}
                id="use_case"
                className={`w-full px-4 py-3 bg-primary-dark border rounded-lg text-neutral-light focus:outline-none focus:ring-2 transition-all ${
                  errors.use_case
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-neutral-gray/30 focus:border-accent focus:ring-accent/20'
                }`}
              >
                <option value="">Wybierz zastosowanie</option>
                <option value="home_assistance">Asystent domowy</option>
                <option value="elder_care">Opieka nad seniorami</option>
                <option value="warehouse">Magazyn/Logistyka</option>
                <option value="manufacturing">Produkcja</option>
                <option value="retail">Handel detaliczny</option>
                <option value="hospitality">Hotele/Restauracje</option>
                <option value="education">Edukacja</option>
                <option value="research">Badania naukowe</option>
                <option value="other">Inne</option>
              </select>
              {errors.use_case && (
                <p className="mt-1 text-sm text-red-400">{errors.use_case.message}</p>
              )}
            </div>

            {/* Budget Range (Required) */}
            <div>
              <label htmlFor="budget_range" className="block text-sm font-medium text-neutral-light mb-2">
                Budżet <span className="text-red-400">*</span>
              </label>
              <select
                {...register('budget_range')}
                id="budget_range"
                className={`w-full px-4 py-3 bg-primary-dark border rounded-lg text-neutral-light focus:outline-none focus:ring-2 transition-all ${
                  errors.budget_range
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-neutral-gray/30 focus:border-accent focus:ring-accent/20'
                }`}
              >
                <option value="">Wybierz przedział budżetowy</option>
                <option value="under_30k">Poniżej €30,000</option>
                <option value="30k_60k">€30,000 - €60,000</option>
                <option value="60k_100k">€60,000 - €100,000</option>
                <option value="100k_150k">€100,000 - €150,000</option>
                <option value="over_150k">Powyżej €150,000</option>
                <option value="flexible">Elastyczny</option>
              </select>
              {errors.budget_range && (
                <p className="mt-1 text-sm text-red-400">{errors.budget_range.message}</p>
              )}
            </div>

            {/* Timeline (Required) */}
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-neutral-light mb-2">
                Termin wdrożenia <span className="text-red-400">*</span>
              </label>
              <select
                {...register('timeline')}
                id="timeline"
                className={`w-full px-4 py-3 bg-primary-dark border rounded-lg text-neutral-light focus:outline-none focus:ring-2 transition-all ${
                  errors.timeline
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-neutral-gray/30 focus:border-accent focus:ring-accent/20'
                }`}
              >
                <option value="">Wybierz termin</option>
                <option value="immediate">Natychmiast (1-2 miesiące)</option>
                <option value="3_6_months">3-6 miesięcy</option>
                <option value="6_12_months">6-12 miesięcy</option>
                <option value="over_1_year">Ponad rok</option>
                <option value="exploring">Tylko rozpoznaję rynek</option>
              </select>
              {errors.timeline && (
                <p className="mt-1 text-sm text-red-400">{errors.timeline.message}</p>
              )}
            </div>

            {/* Hidden Source Field */}
            <input type="hidden" {...register('source_form')} value="audit_request" />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Wysyłanie...
                </span>
              ) : (
                <>Wyślij Zapytanie</>
              )}
            </button>

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                ⚠️ Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.
              </motion.div>
            )}

            {/* GDPR Notice */}
            <p className="text-xs text-neutral-gray mt-4">
              Wysyłając formularz, zgadzasz się na przetwarzanie danych osobowych zgodnie z{' '}
              <a href="/polityka-prywatnosci" className="text-accent hover:underline">
                Polityką Prywatności
              </a>
              . Twoje dane są chronione zgodnie z GDPR.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
