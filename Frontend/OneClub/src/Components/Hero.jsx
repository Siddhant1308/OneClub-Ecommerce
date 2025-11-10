import React,  { useState } from 'react'
import axios from 'axios';

const Hero = () => {

    const [Product, setProduct] = useState([]);

    const click = () => {
        axios.get('http://192.168.50.219:8080/admin')
            .then((Response) => {
                setProduct(Response.data);
                // console.log(Response.data);
                console.log(Product);
            })
    }

    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* left side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>
            {/* right side */}
           
           {/* <button onClick={click}>Click</button> */}
        </div>
    )
}

export default Hero
