import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Provider } from "../components/ui/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: 'swap',
});

// Use default Chakra UI system

export const metadata: Metadata = {
  title: "Shivani & Saurav Wedding",
  description: "Join us for our wedding celebration at Oleander Farms, Karjat from January 14-16, 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Provider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
