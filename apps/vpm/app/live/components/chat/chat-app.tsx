import React, { useEffect, useState } from "react";
import {
  StreamChat,
  Channel as StreamChannel,
  ChannelSort,
  DefaultGenerics,
} from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { fetchData } from "@repo/utils/fetch-data";
import { ChatAppProps } from "@/utils/types";

const apiKey = process.env.NEXT_PUBLIC_STREAMCHAT_API_KEY! as string;
const ChatApp = ({ userId, userName }: ChatAppProps) => {
  const [chatClient, setChatClient] =
    useState<StreamChat<DefaultGenerics> | null>(null);
  const [userToken, setUserToken] = useState<string>("");

  const filters = { type: "messaging", members: { $in: [userId] } };
  const options = { state: true, presence: true, limit: 10 };
  const sort = {
    last_message_at: -1,
    updated_at: -1,
  } as ChannelSort<DefaultStreamChatGenerics>;

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const response = await fetch(`/api/generate-token?userId=${userId}`);
        if (response.ok) {
          const json = await response.json();
          setUserToken(json.userToken);
        }
      } catch (error) {
        console.error("Failed to fetch userToken.");
      }
    };
    userId && fetchUserToken();
  }, [userId]);

  useEffect(() => {
    const initializeChat = async () => {
      const client = StreamChat.getInstance(
        apiKey
      ) as StreamChat<DefaultGenerics>;

      if (process.env.REACT_APP_CHAT_SERVER_ENDPOINT) {
        client.setBaseURL(process.env.REACT_APP_CHAT_SERVER_ENDPOINT);
      }

      try {
        const connectResponse = await client.connectUser(
          {
            id: userId,
            name: userName,
            image: `https://getstream.io/random_png/?name=${userName}`,
          },
          userToken
        );
        if (connectResponse) {
          const checkUserMembership = async () => {
            const filter = { type: "messaging", members: { $in: [userId] } };
            const sort = [
              { last_message_at: -1 },
            ] as ChannelSort<DefaultGenerics>;
            const channels = await client.queryChannels(filter, sort, {
              watch: true,
              state: true,
            });

            if (channels.length === 0) {
              // User is not a member of any channels
              const res = await fetchData("/api/add-member-channels", "POST", {
                userId: userId,
                userName: userName,
              });
              console.log("User added to channels:", res);
            } else {
              console.log("User is already a member of channels");
            }
            setChatClient(client);
          };
          checkUserMembership();
        }
      } catch (err) {
        console.error("Connection error", err);
      }

      return () => {
        if (client) {
          client.disconnectUser();
        }
      };
    };

    if (userId && userToken) {
      initializeChat();
    }
  }, [userToken, userId, userName]);

  if (!chatClient) return null;

  return (
    <Chat client={chatClient} theme="messaging dark" darkMode={true}>
      <ChannelList
        filters={filters}
        options={options}
        showChannelSearch
        sort={sort}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput focus />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatApp;
