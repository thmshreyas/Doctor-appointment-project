import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData,setUserData]=useState({
    name:"Edward Vincent",
    image: assets.profile_pic,
    email:'richardjameswap@gmail.com',
    phone:'+1 234 456 7890',
    address: {
      line1:"57th Cross , Richmond",
      line2:"Circle, Church road , London",
    },
    gender:"Male",
    dob:'2000-01-20'
  })

  const [isEdit,setIsEdit] = useState(false);
  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-6 mb-6">
        <img src={userData.image} alt="Profile" className="w-24 h-24 rounded-full border-2 border-primary" />
        {
          isEdit?
          <input type="text" value={userData.name} onChange={e=> setUserData(prev=>({...prev,name:e.target.value}))} className="text-xl font-semibold border-b-2 focus:outline-none" />
          : <p className="text-xl font-semibold">{userData.name}</p>
        }
      </div>
      <hr className="mb-6" />
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="mb-6 md:w-1/2">
          <p className="text-lg font-medium mb-2">CONTACT INFORMATION</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email:</p>
              <p className="text-gray-700">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone:</p>
              {
                isEdit?
                <input type="text" value={userData.phone} onChange={e=> setUserData(prev=>({...prev,phone:e.target.value}))} className="border-b-2 focus:outline-none" />
                : <p className="text-gray-700">{userData.phone}</p>
              }
            </div>
            <div>
              <p className="text-sm font-medium">Address:</p>
              {
                isEdit?
                <div className="space-y-2">
                  <input onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line1} type="text" className="border-b-2 focus:outline-none w-full" />
                  <input onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={userData.address.line2} type="text" className="border-b-2 focus:outline-none w-full" />
                </div>
                : <p className="text-gray-700">{userData.address.line1}<br />{userData.address.line2}</p>
              }
            </div>
          </div>
        </div>
        <div className="mb-6 md:w-1/2">
          <p className="text-lg font-medium mb-2">BASIC INFORMATION</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Gender:</p>
              {
                isEdit?
                <select onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender} className="border-b-2 focus:outline-none">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className="text-gray-700">{userData.gender}</p>
              }
            </div>
            <div>
              <p className="text-sm font-medium">Birthday:</p>
              {
                isEdit?
                <input type="date" onChange={(e)=>setUserData(prev=> ({...prev,dob:e.target.value}))} value={userData.dob} className="border-b-2 focus:outline-none" />
                : <p className="text-gray-700">{userData.dob}</p>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        {
          isEdit ? 
          <button onClick={()=>setIsEdit(false)} className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark'>Save</button>
          : <button onClick={()=>setIsEdit(true)} className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark'>Edit Profile</button>
        }
      </div>
    </div>
  )
}

export default MyProfile