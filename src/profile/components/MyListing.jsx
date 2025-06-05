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
import { supabase } from './../../../configs/supabaseClient'

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  const GetUserCarListing = async () => {
    if (!user) return;

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

  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      // 1. Fetch images linked to this listing
      const imagesResult = await db.select().from(CarImages).where(eq(CarImages.CarListingId, id));
      const images = imagesResult; 

      // 2. Delete images from Supabase Storage
      for (const img of images) {
        // If img.imageUrl is a full URL, extract the path below
        let pathInBucket = img.imageUrl;

        // Example: if imageUrl is a full URL, extract path relative to bucket
        try {
          const url = new URL(img.imageUrl);
          pathInBucket = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
          // Remove bucket name prefix if present, e.g., 'bucket-name/xyz'
          // Adjust this depending on your bucket name and URL structure
          const bucketName = 'your-bucket-name';  // REPLACE with your actual bucket name
          if (pathInBucket.startsWith(bucketName + '/')) {
            pathInBucket = pathInBucket.replace(bucketName + '/', '');
          }
        } catch {
          // if it's not a full URL, keep as is
        }

        const { error } = await supabase.storage
          .from('your-bucket-name')  // REPLACE with your actual bucket name
          .remove([pathInBucket]);

        if (error) {
          console.error(`Failed to delete image ${img.imageUrl} from Supabase:`, error);
        }
      }

      // 3. Delete image records from DB
      await db.delete(CarImages).where(eq(CarImages.CarListingId, id));

      // 4. Delete the car listing record
      await db.delete(Carlisting).where(eq(Carlisting.id, id));

      // 5. Update UI state
      setCarList(prev => prev.filter(item => item.id !== id));

    } catch (error) {
      console.error("Failed to delete listing:", error);
    }
  };

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

              <Button
                variant="destructive"
                size="icon"
                className="flex items-center justify-center transition-colors duration-300 hover:bg-red-700 hover:text-white"
                onClick={() => handleDelete(item.id)}
                aria-label={`Delete listing ${item.listingTitle}`}
              >
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
