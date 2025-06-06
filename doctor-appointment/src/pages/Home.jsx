import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth();
  return (
    <div >
      <Header/>
      <SpecialityMenu />
      <TopDoctors />
      {!user && <Banner />}
    </div>
  )
}

export default Home