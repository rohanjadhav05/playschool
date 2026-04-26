import { Helmet } from 'react-helmet-async'
import { SCHOOL } from '../../../school.config.js'

const BASE_URL = `https://${SCHOOL.domain}`

export default function SEO({ title, description, canonical = '/', keywords, image }) {
  const fullTitle = title
    ? `${title} | ${SCHOOL.name}`
    : `${SCHOOL.name} | ${SCHOOL.tagline}`
  const url = `${BASE_URL}${canonical}`
  const img = image || `${BASE_URL}/og-image.jpg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={SCHOOL.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  )
}
