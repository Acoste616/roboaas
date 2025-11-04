module.exports = ({ env }) => ({
  // Enable i18n plugin with default locales
  i18n: {
    enabled: true,
    config: {
      locales: ['en', 'pl', 'de'],
      defaultLocale: 'pl'
    }
  }
});
