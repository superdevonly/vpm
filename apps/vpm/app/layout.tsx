import { metatags } from "@/utils/metatags-config";
import { Inter } from "next/font/google";
import React from "react";
import { Providers } from "./providers";
import Footer from "@repo/ui/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";
import { cn } from "@repo/ui/utils";
import NavBar from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  ...metatags,
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={cn("flex h-screen flex-col", inter.className)}>
        <div className="flex-grow scroll-smooth">
          <GoogleAnalytics gaId="G-TT2T3JHPKV" />
          <div className="flex flex-col overflow-hidden">
            <Providers>
              <NavBar />
              {children}
            </Providers>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
