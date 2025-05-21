import { Button } from '@/components/ui/button';
import React from 'react';

function OwnersDetail({ carDetail }) {
  const OnMessageOwnerButtonClick = () => {
    alert(`Message sent to ${carDetail?.userName || 'Owner'} (${carDetail?.createdBy})`);
  };

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl mb-3'>Owner/Dealer</h2>
      <img src={carDetail?.userImageUrl} alt="Owner" className='w-[70px] h-[70px] rounded-full object-cover' />
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
      <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>
      <Button className='w-full mt-6' onClick={OnMessageOwnerButtonClick}>
        Message Owner
      </Button>
    </div>
  );
}

export default OwnersDetail;
