"use client";
import { AppProvider } from "@/context/AppContext";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react-3.1.9";
import { PrivyProvider } from "@privy-io/react-auth";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { base, polygon, mainnet } from "viem/chains";

const client = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY!,
  }),
});

export const Providers = ({ children }: any) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LivepeerConfig client={client}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ["wallet", "email", "google", "farcaster", "spotify"],
            appearance: {
              theme: "dark",
              accentColor: "#FFF",
              logo: "https://i.postimg.cc/k4qX3DBz/Beige-and-White-Be-Yourself-Square-Pillow-4-1.png",
              showWalletLoginFirst: false,
            },
            defaultChain: base,
            supportedChains: [base, polygon, mainnet],
          }}
        >
          <AppProvider>
            <Suspense>{children}</Suspense>
          </AppProvider>
        </PrivyProvider>
      </LivepeerConfig>
    </ThemeProvider>
  );
};
