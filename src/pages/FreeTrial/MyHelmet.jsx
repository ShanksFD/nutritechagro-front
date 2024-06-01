import { Helmet } from 'react-helmet-async';

import { useTranslation } from 'react-i18next';

export const MyHelmet = ({ success = false }) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <Helmet>
      <html lang={currentLanguage.slice(0, 2)} />
      <title>{t('HELMET.FREE_TRIAL.TITLE')}</title>
      <meta name="description" content={t('HELMET.FREE_TRIAL.DESCRIPTION')} />
      <link
        rel="canonical"
        href={`https://nutritechagro.com/${
          success ? 'trial-success' : 'free-trial'
        }`}
      />

      {/* Twitter */}
      <meta name="twitter:title" content={t('HELMET.FREE_TRIAL.TITLE')} />
      <meta
        name="twitter:description"
        content={t('HELMET.FREE_TRIAL.DESCRIPTION')}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={t('HELMET.FREE_TRIAL.TITLE')} />
      <meta
        property="og:description"
        content={t('HELMET.FREE_TRIAL.DESCRIPTION')}
      />
      <meta
        property="og:url"
        content={`https://nutritechagro.com/${
          success ? 'trial-success' : 'free-trial'
        }`}
      />

      {success && <meta name="robots" content="noindex" />}
      {success && <meta name="googlebot" content="noindex" />}
    </Helmet>
  );
};
