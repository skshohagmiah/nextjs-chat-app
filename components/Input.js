import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuid } from 'uuid';
import { storage } from '../app/register/page';
import { db } from "../firebase";
import uploadImage from '../public/upload image.png';

const Input = ({user,state}) => {
const [text,setText] = useState();
const [img, setImg] = useState(null);
const handleClick = async() => {
if(img){
  const storageRef = ref(storage, uuid());
  const uploadTask = uploadBytesResumable(storageRef, img);

  uploadTask.on(
      (error) => {
  
      }, 
      async() => {
        // Upload completed successfully, now we can get the download URL
      const downloaded = await getDownloadURL(uploadTask.snapshot.ref)
      await updateDoc(doc(db, "chats", state.chatId),{
        messages: arrayUnion({
          id:uuid(),
          text,
          senderId:user.uid,
          date:Timestamp.now(),
          img:downloaded
        })
      })
    })
    setText('')
    setImg(null)

}else {
  await updateDoc(doc(db, "chats", state.chatId),{
    messages: arrayUnion({
      id:uuid(),
      text,
      senderId:user.uid,
      date:Timestamp.now()
    })
  })
  await updateDoc(doc(db,'userchats',user.uid),{
    [state.chatId + ".lastMessage"]:{
      text
    },
    [state.chatId + ".date"]: serverTimestamp()
  })
  await updateDoc(doc(db,'userchats',state.user.uid),{
    [state.chatId + ".lastMessage"]:{
      text
    },
    [state.chatId + ".date"]: serverTimestamp()
  })
}
setText('')
setImg(null)
}
let inputElement = state.user.uid && <div className="flex items-center space-x-2 justify-between bg-white p-1  w-full">
<input className="w-full p-2 outline-none" type='text' placeholder='type something...' value={text} onChange={(e) => setText(e.target.value)} />

    <input className="hidden" type='file' id="file" onChange={(e) => setImg(e.target.files[0])} />
    <label htmlFor="file">
        <Image className="" src={uploadImage} width={40} height={40} alt="image" />
    </label>
    <button onClick={handleClick} className="bg-gray-800 text-white capitalize p-2 px-4 hover:bg-gray-600">send</button>
</div>
  return (
  inputElement
  )
}

export default Input