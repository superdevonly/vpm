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
import { useAppContext } from "@/context/AppContext";

const NavBar: React.FC = () => {
  const { user, logout, login, authenticated } = usePrivy();
  const { setChatUser } = useAppContext();
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
      const fetchUserCredits = async () => {
        setChatUser({
          userId: user.id.replaceAll(":", "@"),
          userName: user?.google?.name!,
        });
        await createUser(user.id);
        const res = await getUserCredits(user.id);
        await setUserImageCredits(res?.imageCredits);
        await setUserVideoCredits(res?.videoCredits);
      };
      fetchUserCredits();
    }
  }, [user]);

  return (
    <div className="w-full p-8">
      <nav className="flex flex-col items-center justify-between px-4 sm:flex-row">
        <Link href="/">
          <h1 className="mb-4 text-lg font-bold sm:mb-0">VPM ⚡️</h1>
        </Link>

        {user && (
          <div className="flex flex-col gap-4 mx-auto sm:flex-row sm:items-center sm:gap-8">
            <div className="gap-4 sm:flex sm:flex-row sm:items-center md:pr-[62px]">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger value="home" onClick={handleHomeClick}>
                    Generate
                  </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                  <MenubarTrigger>
                    <Link href={`/live`}>Livestream</Link>
                  </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                  <MenubarTrigger>
                    <Link href={`/gallery`}>My Gallery</Link>
                  </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                  <MenubarTrigger>Profile</MenubarTrigger>
                  <MenubarContent>
                    <div className="flex w-full justify-between px-2 py-1.5 text-sm text-muted-foreground">
                      <div>Your image credits</div>
                      <div>{userImageCredits}</div>
                    </div>
                    <div className="flex w-full justify-between px-2 py-1.5 text-sm text-muted-foreground">
                      <div>Your video credits</div>
                      <div>{userVideoCredits}</div>
                    </div>

                    <MenubarItem
                      onClick={() =>
                        router.push(
                          `${process.env.NEXT_PUBLIC_CREDIT_PAYMENT_STANDARD_GATEWAY_URL!}?checkout[custom][user_id]=${user.id}`
                        )
                      }
                    >
                      Buy Standard Credits
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        router.push(
                          `${process.env.NEXT_PUBLIC_CREDIT_PAYMENT_PATRON_GATEWAY_URL!}?checkout[custom][user_id]=${user.id}`
                        )
                      }
                    >
                      Buy Patron Credits
                    </MenubarItem>

                    <MenubarSeparator />
                    <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        )}

        {!user && <Button onClick={handleLogin}>Sign In</Button>}
      </nav>
    </div>
  );
};

export default NavBar;
