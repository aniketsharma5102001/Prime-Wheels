import { Separator } from "@/components/ui/separator";
import React from 'react';
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';

function CarItem({ car }) {
  
  return (
    <Link to={'/listing-details/'+car?.id}>
    <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer relative">
      {/* Conditionally render the "New" badge */}
      {car?.offerType === 'New' && (
        <h2 className='absolute top-2 left-2 bg-green-500 px-2 rounded-full text-sm text-white'>
          New
        </h2>
      )}

      <img
        src={car?.images?.[0]?.imageUrl || "https://via.placeholder.com/300x180?text=No+Image"}
        width="100%"
        height={250}
        className='rounded-t-xl h-[180px] object-cover'
        alt={car?.make || "Car Image"}
      />

      <div className='p-4'>
        <h2 className='font-bold text-black text-lg mb-2'>
          {`${car?.make || ""} ${car?.model || ""}`.trim() || "Unnamed Car"}
        </h2>

        <Separator className='text-lg' />

        <div className='grid grid-cols-3 mt-5 text-center'>
          <div className='flex flex-col items-center'>
            <LuFuel className='text-lg mb-1' />
            <h2>{car?.engineSize || "0"}</h2>
          </div>

          <div className='flex flex-col items-center'>
            <IoSpeedometerOutline className='text-lg mb-1' />
            <h2>{car?.driveType || "N/A"}</h2>
          </div>

          <div className='flex flex-col items-center'>
            <GiGearStickPattern className='text-lg mb-1' />
            <h2>{car?.fuelType || "Manual"}</h2>
          </div>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <h2 className='font-bold text-xl'>${car?.SellingPrice || 0}</h2>
          <Link to={`/car-details/${car?.id}`} className='text-blue-600 text-sm flex gap-2 items-center'>
            View Details <MdOpenInNew />
          </Link>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default CarItem;
