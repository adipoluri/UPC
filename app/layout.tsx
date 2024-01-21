import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "../src/components/navbar";
import { Layout } from "@/src/components/dom/Layout";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#fff2ab]">
        <Layout>   
          <UserProvider>    
            {children}
          </UserProvider>
        </Layout>
      </body>
    </html>
  );
}

