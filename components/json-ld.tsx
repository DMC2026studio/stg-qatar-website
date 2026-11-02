import { company } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.arabicName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo-horizontal.png"),
    email: company.email,
    telephone: company.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building No. 56, Street No. 3118, Zone No. 91, Birkat Al Awamer",
      postalCode: "23905",
      addressLocality: "Doha",
      addressCountry: "QA",
    },
    areaServed: {
      "@type": "Country",
      name: "Qatar",
    },
    sameAs: [company.websiteUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
