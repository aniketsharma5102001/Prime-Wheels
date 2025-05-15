import Header from '@/components/Header';
import Search from '@/components/Search';
import { db } from './../../../configs';
import { CarImages, Carlisting } from './../../../configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarItem from '@/components/CarItem';
import Service from '@/Shared/Service';

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    GetCarList();
  }, [category]);

  const GetCarList = async () => {
    try {
      const result = await db
        .select()
        .from(Carlisting)
        .innerJoin(CarImages, eq(Carlisting.id, CarImages.CarListingId))
        .where(eq(Carlisting.catagory, category));

      const formatted = Service.FormatResult(result);
      setCarList(formatted);
    } catch (error) {
      console.error('Error fetching car list:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>

      <h2 className="font-bold text-4xl p-10 md:px-20">{category}</h2>

      {carList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {carList.map((car, index) => (
            <div key={car.id || index}>
              <CarItem car={car} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center p-10">No cars found in this category.</p>
      )}
    </div>
  );
}

export default SearchByCategory;
