import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import "./globals.css";
const plusJakartaSans = Plus_Jakarta_Sans({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const jetBrainsMono = JetBrains_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Visualynx — Learn STEM. Visually.',
  description: 'Interactive visual learning for STEM concepts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
