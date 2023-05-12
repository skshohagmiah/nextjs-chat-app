import { doc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
const Chats = ({user,dispatch}) => {
const [chats,setChats] = useState([]);

useEffect(() =>{
  const getChats = () => {
    const unsub= onSnapshot(doc(db,'userchats',user.uid),(doc) => {
      console.log(doc.data())
      setChats(doc.data());
    })
    return () =>{
      unsub()
    }
  }
  user.uid && getChats()

},[user.uid])

const handleSelect = (user) => {
  dispatch({type:'changeUser',payload:user})
}


  return (
    <div className='flex flex-col items-center sm:items-baseline sm:justify-between'>
      {Object.entries(chats).sort((a,b ) => b[1].date - a[1].data).map((chat) => (
          <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className='flex items-center space-x-2 p-2 border-b-2 border-purple-700 w-full hover:bg-gray-600 transition-all'>
          <Image className='object-cover rounded-full' src={chat[1].userInfo.photoURL} width={50} height={50} alt='profile'/>
          <div>
              <p className='capitalize hidden sm:block font-bold text-lg'>{chat[1].userInfo.displayName}</p>
              <p className='hidden sm:block text-sm text-gray-400'>{chat[1].lastMessage?.text}</p>
          </div>
       </div>
      ))}
    </div>
  )
}

export default Chats