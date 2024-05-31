import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export const getPrivyUser = async (authToken: string) => {
  return await privy.verifyAuthToken(authToken);
};
