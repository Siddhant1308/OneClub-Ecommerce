import React from 'react'
import LogoImage from '../assets/oneclub.jpg'

const Footer = () => {
    return (
        <div className='flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
            <div>
                <img src={LogoImage} className='mb-5 w-32' alt="Logo" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Our website will offer a diverse range of products including clothing, 
                    electronics, and jewelry. It aims to provide a seamless shopping experience with 
                    a user-friendly interface, ensuring customers find what they need effortlessly.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91-1234567890</li>
                    <li>contact@oneclub.com</li>
                </ul>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ oneclub.com- All Right Reserved</p>
            </div>

        </div>
    )
}

export default Footer