import Input from "./Input"
import Messages from "./Messages"
const Chat = ({user, state}) => {
  return (
    <div className="flex-[2] w-full h-full overflow-y-scroll relative  ">
      <div className="bg-gray-700 p-3 text-white/90 font-light text-xl sticky top-0">
        <span  className="font-bold p-1">
        {state.user?.displayName ? state.user?.displayName : 'None' }
        </span>
          is chatting
        </div>
      <Messages state={state} user={user} />
      <div className="sticky bottom-0">
      <Input user={user} state={state} />
      </div>
    </div>
  )
}

export default Chat