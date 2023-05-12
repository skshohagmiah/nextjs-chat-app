'use client'
import { createUserWithEmailAndPassword, updateProfile, } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { auth, db } from '../../firebase';
import UploadImage from '../../public/upload image.png';
export const storage = getStorage();
const RegisterPage = () => {

 // eslint-disable-next-line react-hooks/rules-of-hooks
 const router = useRouter()
 const handleSubmit = async(e) => {
   e.preventDefault()
  try {
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    const response =await createUserWithEmailAndPassword(auth, email, password)
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + userName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      async() => {
        // Upload completed successfully, now we can get the download URL
      const downloaded = await getDownloadURL(uploadTask.snapshot.ref)
      await updateProfile(response.user,{
        displayName:userName,
        photoURL:downloaded
      })
      await setDoc(doc(db, "users", response.user.uid), {
     uid:response.user.uid,
     displayName:userName,
     email,
     photoURL:downloaded
   });

   await setDoc(doc(db, "userchats", response.user.uid), {});

   router.push('/');

      }
    );
      


  } catch (error) {
    console.log(error)
  }

 }




  return (
    <div className="bg-blue-300 p-2 m-0s w-full overflow-hidden h-screen flex items-center justify-center">
    <div className="border p-2 flex flex-col items-center bg-white rounded-md">
        <p className="font-bold text-3xl text-blue-500 capitalize p-2">my chat</p>
        <p className="font-thin text-blue-500 capitalize ">register</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:m-5 space-y-3">
            <input type="text" className="p-2 border-b-2 border-blue-500 outline-none placeholder:text-xs placeholder:capitalize rounded" placeholder="your name"></input>
            <input type="email" className="p-2 border-b-2 border-blue-500 outline-none placeholder:text-xs placeholder:capitalize rounded" placeholder="your email"></input>
            <input type="password" name="password" className="p-2 border-b-2 border-blue-500 outline-none placeholder:text-xs placeholder:capitalize rounded" placeholder="password"></input>
            <input type="file" className="hidden" id="file"></input>
            <label htmlFor="file"><Image className='inline' src={UploadImage} width={40} height={40} alt='upload an image' />
            <span className='text-blue-600 capitalize text-xs p-2'>add an avator</span>
            </label>
            <button type="submit" className="bg-blue-600 py-2 text-xl text-white capitalize px-8 rounded hover:bg-blue-500">sign up</button>
            <p className='text-blue-600 capitalize text-sm'>you already have an account ? <Link href='/login' className='font-bold underline'>login</Link> </p>
        </form>
    </div>
    </div>
  )
}

export default RegisterPage
