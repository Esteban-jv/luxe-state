import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Discover Screen - Premium Real Estate",
  description: "Luxe Estate - Find your sanctuary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-nordic-dark dark:text-white font-display antialiased selection:bg-mosque selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
