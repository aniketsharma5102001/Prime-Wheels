import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import { CarImages, Carlisting } from './../../../configs/schema'
import { desc } from 'drizzle-orm'
import { useEffect } from 'react'
import { useUser } from "@clerk/clerk-react";
import { eq } from "drizzle-orm";
import Service from '@/Shared/Service'
import { useState } from 'react'
import CarItem from '@/components/CarItem'
import { FaTrashAlt } from "react-icons/fa";

function MyListing() {
    const { user } = useUser();
     const [carList, setCarList] = useState([]);

    useEffect(() => {
        user && GetUserCarListing();
    }, [user])
    
    const GetUserCarListing = async () => {
        const result = await db.select().from(Carlisting)
            .leftJoin(CarImages, eq(Carlisting.id, CarImages.CarListingId))
            .where(eq(Carlisting.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Carlisting.id))
        const resp = Service.FormatResult(result)
        setCarList(resp);
    }

    return (

        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'> My Listing</h2>
                <Link to={'/AddListing'}>
                    <Button> + Add New Listing </Button>
                </Link>
            </div>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, index) => (
            
          <div key={index}>

            <CarItem car={item}/>
            <div className='p-2 bg-gray-50 rounded-lg flex justify-between'>
                <Button>Edit</Button>
                <Button><FaTrashAlt />
</Button>
            </div>
          </div>
        ))}
    

      </div>

        </div>
    )
}

export default MyListing