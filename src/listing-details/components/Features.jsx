import React from 'react';
import { FaCheck } from "react-icons/fa";

function Features({ features }) {
  // Ensure features is a valid object
  if (!features || typeof features !== 'object') {
    return (
      <div className='mt-5 border shadow-md rounded-xl my-7 p-5'>
        <h2 className='font-medium text-2xl mb-5 gap-8'>Features</h2>
        <p className='text-gray-500'>No features available.</p>
      </div>
    );
  }

  return (
    <div className='mt-5 border shadow-md rounded-xl my-7 p-5'>
      <h2 className='font-medium text-2xl mb-5'>Features</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {Object.entries(features).map(([feature, value]) => (
          <div key={feature} className='flex gap-2 items-center'>
            <FaCheck className='text-lg p-1 rounded-full bg-blue-100 text-blue-500' />
            <h2 className='text-sm'>{feature}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
