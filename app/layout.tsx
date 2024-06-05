import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/layouts/navbar";
import Footer from "./(components)/layouts/footer";
import { AppProvider } from "./(components)/appContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Pizza-Time",
  description: "The pizza Kitchen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        {" "}
        <main className="max-w-6xl mx-auto p-4">
          <AppProvider>
            <Navbar />
            {/* <Providers> */}
            {children}
            {/* </Providers> */}
          </AppProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
