import Data from '@/Shared/Data';
import React from 'react'
import { Link } from 'react-router-dom';

function Category() {
  return (
    <div className='mt-40 lg:mt-80'>
      <h2 className='font-bold text-3xl text-center mb-16 '>Browser By Type</h2>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20'>
        {Data.Category.map((Category, index) => (
<Link to={'search/'+Category.name}>
          <div className='border rounded-xl p-3 item-center flex flex-col hover:shadow-md cursor-pointer'>
            <img src={Category.icon} width={34} height={35} />
            <h2 className='mt-2'>{Category.name}</h2>
          </div>
          </Link>
        ))}
      </div>

    </div>

  )
}

export default Category;