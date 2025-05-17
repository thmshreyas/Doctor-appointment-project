import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*---left side---*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Thank you for choosing our website , we are always ready to serve you.</p>

            </div>
            {/*---center---*/}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>ABout Us</li>
                    <li>Contact Us</li>
                    <li>Privacy policy</li>
                </ul>

            </div>
            {/*---right side---*/}
            <div>
                <p className='text-xl font-medium mb-5'>Get in Touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-234-567-890</li>
                    <li>prescidoctor@email.com</li>
                </ul>

            </div>
        </div>
        <div>
            {/*copyrgight*/}
            <hr />
            <p className='py-5 text-sm text-center'> copyright 2025 ©PresciDoctor. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer