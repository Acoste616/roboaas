'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClubPage() {
  const t = useTranslations('club');
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locale }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('Failed to create checkout session');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setIsLoading(false);
    }
  };

  const benefits = [
    { key: 'benefit1', icon: '💬' },
    { key: 'benefit2', icon: '📊' },
    { key: 'benefit3', icon: '🔒' },
    { key: 'benefit4', icon: '🚀' },
    { key: 'benefit5', icon: '🎯' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1E] via-[#0d1428] to-[#0A0F1E] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700"
        >
          {/* Price */}
          <div className="text-center mb-8">
            <div className="inline-block bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full px-6 py-3 mb-6">
              <p className="text-3xl font-bold text-[#00FF88]">
                {t('price')}
              </p>
            </div>
            <p className="text-gray-400 text-sm">{t('cancel_anytime')}</p>
          </div>

          {/* Benefits */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {t('benefits_title')}
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors"
                >
                  <span className="text-3xl flex-shrink-0">{benefit.icon}</span>
                  <p className="text-gray-200 text-lg pt-1">
                    {t(benefit.key as any)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full bg-[#00FF88] text-[#0A0F1E] font-bold text-xl py-4 px-8 rounded-lg hover:bg-[#00dd77] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00FF88]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? t('processing') : t('cta')}
            </button>
            <p className="text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t('secure_payment')}
            </p>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <p>
            🎁 Join our community of innovators and robot enthusiasts
          </p>
        </motion.div>
      </div>
    </div>
  );
}
