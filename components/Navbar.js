import { signOut } from 'firebase/auth'
import Image from 'next/image'
import { auth } from '../firebase'

const Navbar = ({user}) => {
  const image = user.photoURL
  return (
    <div className=' p-1 sm:p-4 w-full flex items-center justify-around bg-gray-900'>
        <p className='hidden mr-2 sm:block capitalize  text-2xl'>chat</p>
        <div className='flex items-center justify-between space-x-2'>
            <Image className='rounded-full object-cover' src={image} width={30} height={30} alt='profile' />
            <p className='capitalize hidden sm:block font-bold'>{user.displayName}</p>
            <p onClick={() => signOut(auth)} className='p-2 capitalize bg-gray-700 rounded-full sm:hidden' >out</p>
            <button onClick={() => signOut(auth)} className='hidden sm:block bg-gray-500 px-2 py-1 rounded capitalize hover:bg-gray-700 transition'>logout</button>
            
        </div>
    </div>
  )
}

export default Navbar