import { ZeroCreditsAlert } from "@/components/zero-credits-alert";
import { getUserCredits } from "@/lib/dynamodb";
import { getPrivyUser } from "@/lib/privy";
import { cookies } from "next/headers";
import { Generate } from "./_components/generate";

const getUserDetails = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("privy-token")?.value;

  try {
    if (!token) return null;
    const user = await getPrivyUser(token);
    return await getUserCredits(user.userId);
  } catch (error) {
    console.log(error);
  }
};

const HomePage = async () => {
  const data = await getUserDetails();
  const imageCredits = data?.imageCredits;

  if (imageCredits !== undefined && imageCredits <= 0) {
    return (
      <div className="flex justify-center my-28">
        <ZeroCreditsAlert />
      </div>
    );
  } else return <Generate routeId="app" />;
};

export default HomePage;
