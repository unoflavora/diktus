import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from "next/router"
import { useEffect, useReducer, useState } from 'react'
import {BsPencil} from 'react-icons/bs'
import { IKContext, IKUpload } from 'imagekitio-react'
import userProfileService from '../services/userProfile'

export default function Profile() {
const router = useRouter()
const { user, error, isLoading } = useUser();
const [profile, dispatch] = useReducer(reducer, null, init)
const [viewUpload, setViewUpload] = useState(false)

useEffect(() => {
  let mounted=true
  if(user) {
    if(mounted) {
      dispatch({type: 'reset', payload: {...user}})
    }
  }
  mounted=false
}, [user])

const STYLES = {
  container: ' overflow-x-hidden py-5 px-1 flex flex-col gap-5 justify-center items-center font-poppins text-lg',
  label: 'flex flex-col gap-1',
  input: 'rounded-xl bg-gray-50 focus:bg-white'
}

const onError = (err) => {
  console.log('Error');
  console.log(err);
};

const onSuccess = (res) => {
  console.log('Success');
  dispatch({type: 'picture', payload: `${res.url}?tr=h-100,w-100`})
};

const handleSubmit = async(event) => {
  event.preventDefault()
  const res = await userProfileService(user.sub).update({
    email: profile.email,
    name: profile.name,
    nickname: profile.nickname,
    picture: profile.picture
  })
  console.log(res)
}



if (isLoading) return <div>Loading...</div>;
if (error) return <div>{error.message}</div>;
if(user && profile) {
  console.log(profile)
  return (
    <div className='overflow-hidden'>
      <Navbar/>  
        <div className={STYLES.container}>
            <div className='relative rounded-full w-20 h-20 lg:w-36 lg:h-36 border-2'>
              <img className='rounded-full w-full h-full' src={profile.picture}/>
              <button 
                onClick={() => setViewUpload(!viewUpload)}
                className='absolute -right-1/2 bottom-2/3 bg-green-500 rounded-full p-3 text-white'>
                <BsPencil/>
              </button>
            </div>
          
            {viewUpload && 
            <div className='w-full md:w-1/4 flex justify-center'>
            <UploadModal onSuccess={onSuccess} onError={onError}/>
            </div>
            }

            <form className='flex flex-col gap-5'>
              <label className={STYLES.label} for='name'>Nama Lengkap
                <input className={STYLES.input} type='text' value={profile.name}
                  onChange={(e) => 
                    dispatch({type: 'name', payload: e.target.value})}/>
              </label>
              <label className={STYLES.label} for='username'>Username
                <input className={STYLES.input} type='text' value={profile.nickname}
                  onChange={(e) => 
                    dispatch({type: 'username', payload: e.target.value})}/>
              </label>
              <label className={STYLES.label} for='email'>Alamat Email
                <input className={STYLES.input} type='email' value={profile.email}
                  onChange={(e) => 
                    dispatch({type: 'email', payload: e.target.value})}/>
              </label>
              <button type='submit' 
              onClick={handleSubmit}
                className='bg-green-500 text-white rounded-xl text-lg px-6 py-2'>
                Submit
              </button>
            </form>
        </div>
      <Footer/>
    </div>
  )
} else {
  router.push(`/api/auth/login?returnTo=/profile`)
} 
}

 

function reducer(state, action) {
  switch(action.type) {
    case 'name': 
      return {...state, name: action.payload}
    case 'picture':
      return {...state, picture: action.payload}
    case 'username': 
      return {...state, nickname: action.payload}
    case 'email': 
      return {...state, email: action.payload}
    case 'reset':
      return init(action.payload)
  }
}

function init(allData) {
  return {...allData}
}

function UploadModal ({onSuccess, onError}) {
  return(
    <div className='w-3/4'>
 <IKContext
      publicKey="public_TxGtjJssWHCXc1UswoVy1G8F9Mg="
      urlEndpoint="https://ik.imagekit.io/ptnbanks/"
      authenticationEndpoint="http://localhost:3000/api/auth/image"
    >
      <IKUpload
        onError={onError}
        onSuccess={onSuccess}
      />
    </IKContext>
    </div>
   
    
  )
}