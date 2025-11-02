'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const formSchema = z.object({
  first_name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  source_form: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function ReportDownloadForm() {
  const t = useTranslations('report_form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source_form: 'report_download_gdpr',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card glow-box">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-neutral-light glow-text">
            {t('title')}
          </h2>
          <p className="text-neutral-gray">
            {t('subtitle')}
          </p>
        </div>

        {submitStatus === 'success' ? (
          <div className="bg-accent/10 border border-accent rounded-lg p-6 text-center">
            <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-accent font-semibold text-lg">
              {t('success')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name (Optional) */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-neutral-light mb-2">
                {t('first_name')}
              </label>
              <input
                id="first_name"
                type="text"
                {...register('first_name')}
                className="w-full px-4 py-3 bg-primary border border-neutral-gray/30 rounded-lg text-neutral-light focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-all"
                placeholder="Jan"
              />
            </div>

            {/* Email (Required) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-light mb-2">
                {t('email')} <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 bg-primary border rounded-lg text-neutral-light focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-all ${
                  errors.email ? 'border-red-500' : 'border-neutral-gray/30'
                }`}
                placeholder={t('email_placeholder')}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Hidden Field */}
            <input type="hidden" {...register('source_form')} />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                t('submit')
              )}
            </button>

            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm text-center">{t('error')}</p>
            )}
          </form>
        )}

        {/* Mockup Image Placeholder */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-primary-dark border border-accent/30 rounded-lg p-4">
            <div className="w-32 h-40 bg-neutral-gray/10 rounded flex items-center justify-center">
              <svg className="w-16 h-16 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xs text-neutral-gray mt-2">Raport PDF Mockup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
