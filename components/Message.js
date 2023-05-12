import Image from "next/image";
import { useEffect, useRef } from "react";
const Message = ({message, state,user}) => {

  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])

  return (
    <div ref={ref} className={message.senderId === user.uid ? "flex flex-row-reverse items-start space-y-6 justify-start p-1 text-black/80": "flex flex-row-reverse items-start space-y-6 justify-end p-1 text-black/80"}>
        <Image className="rounded-full object-cover m-2" src={message.senderId === user.uid ? user.photoURL : state.user.photoURL} width={60} height={60} alt="img" />
        <div className="">
          <p className="bg-gray-700 rounded-md p-2 text-white/90">{message.text}</p>
          {message.img && 
        <Image className="rounded object-cover m-1" alt="img" src={message.img} width={100} height={100} />
        }
        </div>
    </div>

    
  )
}

export default Message;