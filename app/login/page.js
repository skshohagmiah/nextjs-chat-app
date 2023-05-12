'use client'
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from '../../firebase.js';

const Loginpage = () => {

const router = useRouter()

const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
  await  signInWithEmailAndPassword(auth,email,password)
    router.push('/')


}


    return (
        <div className="bg-blue-300 h-screen flex items-center justify-center">
        <div className="border p-2 flex flex-col items-center bg-white rounded-md">
            <p className="font-bold text-3xl text-blue-500 capitalize p-2">my chat</p>
            <p className="font-thin text-blue-500 capitalize ">login</p>
            <form className="flex flex-col m-5 space-y-3" onSubmit={handleSubmit}>
                <input type="email" className="p-2 border-b-2 border-blue-500 outline-none placeholder:text-xs placeholder:capitalize rounded" placeholder="your email"></input>
                <input type="password" className="p-2 border-b-2 border-blue-500 outline-none placeholder:text-xs placeholder:capitalize rounded" placeholder="password"></input>
                <button type="submit" className="bg-blue-600 py-2 text-xl text-white capitalize px-8 rounded hover:bg-blue-500">sign in</button>
                <p className='text-blue-600 capitalize text-sm'>you don`t have an account ? <Link href='/register' className='font-bold underline'>register</Link> </p>
            </form>
        </div>
        </div>
      )

}

export default Loginpage