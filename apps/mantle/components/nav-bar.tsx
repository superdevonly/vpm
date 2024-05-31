"use client";
import { createUser, getUserCredits } from "@/lib/dynamodb";
import { useUserCreditsStore } from "@/lib/store";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@repo/ui/menubar";
import Button from "@repo/ui/button";
import { formatAddress } from "@repo/ui/utils";

const NavBar: React.FC = () => {
  const { user, logout, login, authenticated, ready } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();
  const {
    userImageCredits,
    userVideoCredits,
    setUserImageCredits,
    setUserVideoCredits,
  } = useUserCreditsStore();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleHomeClick = async () => {
    if (pathname === "/app") {
      router.refresh();
    } else {
      router.push("/app");
    }
  };

  const handleLogin = async () => {
    await login();
    router.push("/app");
  };

  useEffect(() => {
    if (user && authenticated) {
      console.log("USER", user);
      const fetchUserCredits = async () => {
        await createUser(user.id);
        const res = await getUserCredits(user.id);
        await setUserImageCredits(res?.imageCredits);
        await setUserVideoCredits(res?.videoCredits);
      };
      fetchUserCredits();
    }
  }, [user]);

  return (
    <div className="w-full p-8 mb-10">
      <nav className="flex flex-col items-center justify-between px-4 sm:flex-row">
        <Link href="/">
          <h1 className="mb-4 text-lg font-bold sm:mb-0">
            Mantle activation POC
          </h1>
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="gap-4 sm:flex sm:flex-row sm:items-center md:pr-[62px]">
            {user && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    {formatAddress(user.wallet?.address)}
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      onClick={() =>
                        router.push(
                          `${process.env.NEXT_PUBLIC_CREDIT_PAYMENT_STANDARD_GATEWAY_URL!}?checkout[custom][user_id]=${user.id}`
                        )
                      }
                    >
                      My NFT Collections
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        router.push(
                          `${process.env.NEXT_PUBLIC_CREDIT_PAYMENT_PATRON_GATEWAY_URL!}?checkout[custom][user_id]=${user.id}`
                        )
                      }
                    >
                      My Telegram Bots
                    </MenubarItem>

                    <MenubarSeparator />
                    <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
            {!user && (
              <Button onClick={handleLogin}>
                {ready ? "Sign In" : "Loading..."}
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
