import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "../src/components/navbar";
import { Layout } from "@/src/components/dom/Layout";
import Opener from "@/src/components/dom/Opener";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Public+Sans:wght@700&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-[#ffc702]">
      <div className="absolute top-0 left-0 z-[11] w-screen pointer-events-none">
        < Opener/>
      </div>
        <Layout>   
          <UserProvider>    
            {children}
          </UserProvider>
        </Layout>
      </body>
    </html>
  );
}

