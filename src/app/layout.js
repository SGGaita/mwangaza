import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeWrapper } from './components/ThemeWrapper';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mwangaza - Digital Civic Platform for Accountability & Justice',
  description: 'Empowering Kenyan citizens in documenting human rights abuses, advocating for accountability, and fostering community resilience.',
  keywords: 'human rights, accountability, justice, Kenya, civic platform, transparency',
};

export default function RootLayout({ children }) {
  // Only load Google Maps if API key is configured
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const shouldLoadGoogleMaps = googleMapsApiKey && googleMapsApiKey !== 'YOUR_API_KEY_HERE';

  return (
    <html lang="en">
      <head>
        {shouldLoadGoogleMaps && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`}
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={inter.className}>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
