import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { db } from "../firebase";

const Search = ({user}) => {

const [input, setInput] = useState('');
const [userName, setUserName] = useState('');

const handleQuery= async() => {
  const q = query(collection(db, "users"), where("displayName", "==", input));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setUserName(doc.data())
  console.log(doc.id, " => ", doc.data());
});
}

const handleKey = (e) => {
  e.code == 'Enter' ? handleQuery():null;
}

const handleSelect = async() => {
  const combinedId = user.uid > userName.uid ? user.uid + userName.uid : userName.uid + user.uid;

  const res = await getDoc(doc(db,'chats',combinedId))
  if(!res.exists()){
    await setDoc(doc(db,'chats',combinedId),{messages:[]})
  }

  updateDoc(doc(db,'userchats',user.uid),{
    [combinedId+'.userInfo']: {
      uid:userName.uid,
      displayName: userName.displayName,
      photoURL:userName.photoURL
    },
    [combinedId + '.date']:serverTimestamp()
  })
  updateDoc(doc(db,'userchats',userName.uid),{
    [combinedId+'.userInfo']: {
      uid:user.uid,
      displayName: user.displayName,
      photoURL:user.photoURL
    },
    [combinedId + '.date']:serverTimestamp()
  })

  setInput("");
  setUserName('');
}
return (
  <div>
      <div>
      <input type='search' value={input}  onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} className="w-full p-2 bg-transparent outline-none border-b-2" placeholder='find a user' />
      </div>
      {userName && <div className="flex items-center space-x-4 p-2 bg-slate-500" onClick={handleSelect}>
        <Image className="rounded-full object-cover" src={userName.photoURL} width={50} height={50} alt="photo"/>
      <p className="font-bold text-xl capitalize ">{userName.displayName}</p>

      </div> }
      
  </div>

)
}

export default Search