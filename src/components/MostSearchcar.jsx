import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { db } from './../../configs';
import { CarImages, Carlisting } from './../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import Service from '@/Shared/Service';


function MostSearchcar() {
const [carList,setCarList]=useState([]);
  useEffect(() => {
    GetPopulerCarList();
  }, [])


  const GetPopulerCarList = async () => {
    const result = await db.select().from(Carlisting)
      .leftJoin(CarImages, eq(Carlisting.id, CarImages.CarListingId))
      .orderBy(desc(Carlisting.id))
      .limit(10)

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp);
  }

  return (
    <div className='mx-24'>
      <h2 className='font-bold text-3xl text-center my-16 mb-7'>Most Search Car</h2>
      <Carousel>
        <CarouselContent>
          {carList.map((car, index) => (
            <CarouselItem key={index}className="basis-1/4">
              <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MostSearchcar