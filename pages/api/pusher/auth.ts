import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user?.email) {
    return response.status(401);
  }

  const sockedId = request.body.socket_id;
  const channel = request.body.channel_name;
  console.log(channel, "CHANNEL NAME");
  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(sockedId, channel, data);

  return response.send(authResponse);
}
