import { poppins400 } from "@/utils/font";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import "./highlight.css";
import GoogleAdsense from "@/utils/GoogleAdsense";
import { Geist, Raleway } from "next/font/google";
import { cn } from "@/lib/utils";

const raleway = Raleway({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", raleway.variable)}>
      <body className={`${poppins400.className} text-foreground bg-background`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <TopBar />
        {children}
        <Footer />
      </body>
      <GoogleAdsense pId={process.env.GOOGLE_ADSENSE_PID as string}/>
    </html>
  );
}
