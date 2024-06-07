// import MessageInput from "./MessageInput";
import { MessageInput, Messages} from "../index";


const MessageContainer = () => {
  return (
    <div className="w-full flex flex-col">
      <>
        {/* Header */}
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">To:</span>{" "}
          <span className="text-gray-900 font-bold">John doe</span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
