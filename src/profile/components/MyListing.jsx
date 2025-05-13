import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { db } from './../../../configs';
import { CarImages, Carlisting } from './../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from "@clerk/clerk-react";
import Service from '@/Shared/Service';
import CarItem from '@/components/CarItem';
import { FaTrashAlt } from "react-icons/fa";

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  // Define the GetUserCarListing function here
  const GetUserCarListing = async () => {
    if (!user) return; // Early exit if user is not logged in

    try {
      const result = await db.select().from(Carlisting)
        .leftJoin(CarImages, eq(Carlisting.id, CarImages.CarListingId))
        .where(eq(Carlisting.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Carlisting.id));

      const resp = Service.FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching user car listings:", error);
    }
  };

  // Call the GetUserCarListing function once the user is available
  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user]);  // Re-run when user changes

  return (
    <div className='mt-6'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-4xl'>My Listing</h2>
        <Link to={'/AddListing'}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="p-2 bg-gray-50 rounded-b-lg flex gap-2">
              <Link to={'/AddListing?mode=edit&id=' + item?.id} className="w-full">
                <Button variant="outline" className="w-full">Edit</Button>
              </Link>
              <Button variant="destructive" size="icon" className="flex items-center justify-center">
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;
