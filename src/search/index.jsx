import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from './../../configs';
import { CarImages, Carlisting } from './../../configs/schema';
import { eq, and } from 'drizzle-orm'; // Make sure you're importing `and`
import Service from '@/Shared/Service';
import Header from '@/components/Header';
import CarItem from '@/components/CarItem';
import Search from '@/components/Search';

function SearchByOptions() {
    const [searchParam] = useSearchParams();
const [carList,setCarList]=useState([]);
    const condition = searchParam.get('cars');
    const make = searchParam.get('make');
    const price = searchParam.get('price'); // Not used yet

    useEffect(() => {
        GetCarList();
    }, [condition, make, price]);

    const GetCarList = async () => {
        // Build conditional filters
        const filters = [];
        if (condition) filters.push(eq(Carlisting.condition, condition));
        if (make) filters.push(eq(Carlisting.make, make));
        // You can add price logic here based on how your pricing is stored

        const result = await db
            .select()
            .from(Carlisting)
            .innerJoin(CarImages, eq(Carlisting.id, CarImages.CarListingId))
            .where(and(...filters));

        const resp = Service.FormatResult(result);
        console.log(resp);
        setCarList(resp);
    };

    return (
        <div>
            <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>

      <h2 className="font-bold text-4xl p-10 md:px-20">Search Result</h2>

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
        </div>
    );
}

export default SearchByOptions;
