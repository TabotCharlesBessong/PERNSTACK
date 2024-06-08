// import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { MessageInput, Messages} from "../index";
import NoChatSelected from "./NoChatSelected";


const MessageContainer = () => {
  const {selectedConversation} = useConversation()
  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation?.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
    </div>
  );
};
export default MessageContainer;
