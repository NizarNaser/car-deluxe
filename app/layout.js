
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import WhatsAppButton from "@/Components/WhatsAppButton";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

export const metadata = {
  metadataBase: new URL('https://car-deluxe.vercel.app'), // Replace with actual domain if custom
  title: {
    default: "Auto Deluxe | Premium Gebrauchtwagen in Kassel",
    template: "%s | Auto Deluxe"
  },
  description: "Ihr vertrauenswürdiger Partner für den An- und Verkauf von Gebrauchtwagen in Kassel. Geprüfte Qualität, faire Preise und erstklassiger Service.",
  keywords: ["Gebrauchtwagen", "Auto kaufen Kassel", "Gebrauchtwagenhändler", "Auto verkaufen", "Premium Autos", "Auto Deluxe", "Kassel"],
  authors: [{ name: "Nizar Naser" }],
  creator: "Auto Deluxe Team",
  publisher: "Auto Deluxe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Auto Deluxe | Premium Gebrauchtwagen in Kassel",
    description: "Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen. Qualität und Vertrauen in jedem Fahrzeug.",
    url: 'https://car-deluxe.vercel.app',
    siteName: 'Auto Deluxe',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/hero.jpg', // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: 'Auto Deluxe Showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Auto Deluxe | Premium Gebrauchtwagen",
    description: "Ihr Partner für geprüfte Gebrauchtwagen in Kassel.",
    images: ['/hero.jpg'],
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Ideally should add this file
  },
};

export default function RootLayout({ children }) {
  // Structured Data for Local Business / Auto Dealer
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Auto Deluxe",
    "image": "https://car-deluxe.vercel.app/hero.jpg",
    "@id": "https://car-deluxe.vercel.app",
    "url": "https://car-deluxe.vercel.app",
    "telephone": "+4915140144530",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Leipziger Str. 323",
      "addressLocality": "Kassel",
      "postalCode": "34123",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.3127, // Approximate logic for Kassel, user can refine
      "longitude": 9.4797
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/profile.php?id=61560404041826",
      "https://instagram.com/deluxe.auto.de",
      "https://www.tiktok.com/@deluxe.auto.de"
    ]
  };

  return (
    <html lang="de">
      <body
        className={outfit.className}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <ToastContainer theme="dark" />
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
