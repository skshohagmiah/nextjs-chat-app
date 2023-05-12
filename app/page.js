'use client';

import Chat from "@/components/Chat.js";
import Sidebar from "@/components/Sidebar.js";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import Loginpage from "./login/page";


export default function Home() {
  const [user,setUser] = useState({});
  
  const initialState = {
    chatId:'null',
    user:{}
  }
  
  useEffect(()=>{
    const unsubs =  onAuthStateChanged(auth,(user) => {
      setUser(user)
    })
    return () => {
      unsubs()
    }
  },[]);
  
  const chatReducer = (state, action) => {
    switch(action.type){
      case 'changeUser':
        return{
          user:action.payload,
          chatId:user.uid > action.payload.uid ? user.uid + action.payload.uid : action.payload.uid + user.uid
        }
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(chatReducer,initialState)
console.log(state)




  return (
  <div className="p-3">
    {user ? 
    <main className="bg-blue-300 flex items-center justify-center h-screen">
      <div className="bg-white/70 w-screen h-screen flex sm:w-4/5 sm:h-4/5 rounded-lg shadow-lg ">
        <Sidebar user={user} dispatch={dispatch}/>
        <Chat user= {user} state={state} dispatch={dispatch}   />
      </div>
    </main>:
    <Loginpage />
    }
  </div>
    
  )
}
