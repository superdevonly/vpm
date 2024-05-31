import React from "react";
import Button from "@repo/ui/button";
import Link from "next/link";
import Image from "next/image";

interface AuthenticateProps {
  login: any;
}

const Authenticate: React.FC<AuthenticateProps> = ({ login }) => (
  <div className="flex flex-col items-center gap-4">
    <Image
      src="/logo.png"
      alt="Logo"
      width={200}
      height={200} // Adjust height as needed
      style={{ marginBottom: "20px" }}
    />

    <div className="flex flex-col gap-4">
      <Button size="lg" variant="outline" onClick={login}>
        Sign In to Select Modes
      </Button>
      <Button size="lg" asChild>
        <Link href="https://eu.jotform.com/form/240594613118051">
          Sign Up (Waitlist)
        </Link>
      </Button>
    </div>
  </div>
);

export default Authenticate;
