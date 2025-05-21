import { Button } from '@/components/ui/button';
import React from 'react';

function OwnersDetail({ carDetail, userId, OwnerUserId }) {
  const handleMessageOwner = async () => {
    try {
      const response = await Service.CreateSenBirdChannel(
        [userId, OwnerUserId],
        carDetail?.listingTitle
      );
      console.log("Channel Created", response);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl mb-3'>Owner/Deals</h2>
      <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' />
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
      <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>
      <Button onClick={handleMessageOwner} className='w-full mt-6'>
        Message Owner
      </Button>
    </div>
  );
}

export default OwnersDetail;
