import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions"; // adjust if needed
import { UserInfo } from "@/models/UserInfo";
import { getServerSession } from "next-auth";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) return false;

  const userInfo = await UserInfo.findOne({ email: userEmail });
  return userInfo?.admin || false;
}
