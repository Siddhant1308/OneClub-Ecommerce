import React from 'react'
import ContactImage from '../assets/contact.png'
import Title from '../Components/Title'

const Contact = () => {
  return (
    <div>
    <div className='text-center text-2xl pt-10 border-t '>
     <Title text1={'CONTACT'} text2={'US'} />
    </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img className='w-full md:max-w-[480px]' src={ContactImage} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl text-gray-600'>Our Store</p>
        <p className='text-gray-500'>Cdac hostel <br /> bangalore</p>
        <p className='text-gray-500'>Tell: +91-1234567890 <br /> Email: contact@oneclub.com</p>
      </div>
      </div>  
    </div>
  )
}

export default Contact