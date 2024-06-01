import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const MyHelmet = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Helmet>
      <html lang={currentLanguage.slice(0, 2)} />
      <title>{t('HELMET.NOT_FOUND.TITLE')}</title>
      <meta name="description" content={t('HELMET.NOT_FOUND.DESCRIPTION')} />
      <link rel="canonical" href={process.env.REACT_APP_WEBSITE_LINK} />

      {/* Google / Search Engine Tags */}
      <meta name="robots" content="noindex" />
      <meta name="googlebot" content="noindex" />
    </Helmet>
  );
};
