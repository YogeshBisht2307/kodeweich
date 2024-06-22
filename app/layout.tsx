import { poppins400 } from "@/utils/font";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import "./highlight.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins400.className} text-foreground bg-background`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <TopBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
