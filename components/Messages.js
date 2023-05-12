import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";
const Messages = ({state, user}) => {
const [messages,setMessages] = useState([]);


useEffect(() => {
const unsub = onSnapshot(doc(db,'chats',state.chatId),(doc) => {
 doc.exists()&& setMessages(doc.data().messages);
})
return () => {
  unsub();
}
},[state.chatId])

console.log(messages)
  return (
   <div className="">
    {messages.map((message) => 
      <Message message={message} state={state} user={user} key={message.id} />
    )}
   </div>
  )
}

export default Messages