import useGetConversations from "../../hooks/conversation/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import { Conversation } from "../index";

const Conversations = () => {
  const { conversations, loading } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
