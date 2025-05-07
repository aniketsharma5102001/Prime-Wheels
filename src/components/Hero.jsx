import React from 'react'
import Search from './Search'
function Hero() {
    return (
        <div>
            <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-neutral-50'>
                <h2 className='text-lg'> Find cars for sale and for rent near you </h2>
                <h2 className='text-[60px]'>Drive Your Dream Car</h2>

                <Search />
                <div className='mb-40'>
                <img src='/Tesla.png'className='mt-5' />
                </div>
        
            </div>
        </div>
    )
}
export default Hero;
