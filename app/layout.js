
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://eficsy.com'),
  title: {
    default: "Eficsy - Enterprise Data Engineering, AI Automation & Custom Software Development",
    template: "%s | Eficsy"
  },
  description: "Leading data engineering company specializing in AI automation, machine learning solutions, ETL pipelines, cloud data warehousing, business intelligence, and enterprise software development. Transform your business with cutting-edge data analytics and AI-powered automation.",
  keywords: [
    // Data Engineering Keywords
    "data engineering services",
    "ETL pipeline development",
    "data warehouse consulting",
    "big data solutions",
    "cloud data architecture",
    "data pipeline automation",
    "real-time data processing",
    "data lake implementation",
    "Apache Spark development",
    "Snowflake consulting",

    // AI & ML Keywords
    "AI automation services",
    "machine learning solutions",
    "artificial intelligence consulting",
    "AI integration services",
    "predictive analytics",
    "natural language processing",
    "computer vision solutions",
    "AI chatbot development",
    "ML model deployment",
    "generative AI solutions",

    // Development Keywords
    "custom software development",
    "web application development",
    "mobile app development",
    "full stack development",
    "enterprise software solutions",
    "SaaS development",
    "API development services",
    "cloud native applications",

    // Analytics Keywords
    "business intelligence consulting",
    "data analytics services",
    "data visualization",
    "Power BI consulting",
    "Tableau consulting",
    "advanced analytics",
    "predictive modeling",
    "data science consulting",

    // Business Keywords
    "digital transformation",
    "data-driven solutions",
    "enterprise automation",
    "workflow automation",
    "process optimization",
    "data strategy consulting"
  ],
  authors: [{ name: "Eficsy" }],
  creator: "Eficsy",
  publisher: "Eficsy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://eficsy.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eficsy.com',
    siteName: 'Eficsy',
    title: "Eficsy - Enterprise Data Engineering, AI Automation & Custom Software Development",
    description: "Leading data engineering company specializing in AI automation, machine learning solutions, ETL pipelines, cloud data warehousing, business intelligence, and enterprise software development.",
    images: [
      {
        url: '/eficwhite1.png',
        width: 1200,
        height: 630,
        alt: 'Eficsy - Data Engineering, AI Automation & Software Development Company',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Eficsy - Enterprise Data Engineering, AI Automation & Custom Software Development",
    description: "Leading data engineering company specializing in AI automation, machine learning solutions, ETL pipelines, cloud data warehousing, and business intelligence.",
    images: ['/eficwhite1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/eficwhite1.png',
    shortcut: '/eficwhite1.png',
    apple: '/eficwhite1.png',
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Eficsy",
    "url": "https://eficsy.com",
    "logo": "https://eficsy.com/eficwhite1.png",
    "description": "Leading data engineering company specializing in AI automation, machine learning solutions, ETL pipelines, cloud data warehousing, business intelligence, and enterprise software development.",
    "sameAs": [
      // Add your social media profiles here when available
      // "https://www.linkedin.com/company/eficsy",
      // "https://twitter.com/eficsy",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English"]
    },
    "areaServed": "Worldwide",
    "serviceType": [
      "Data Engineering",
      "AI Automation",
      "Machine Learning",
      "Software Development",
      "Business Intelligence",
      "Data Analytics"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "u3jeslgd0k");
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
