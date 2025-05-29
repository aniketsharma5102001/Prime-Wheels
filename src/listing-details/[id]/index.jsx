import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import { useParams } from 'react-router-dom';
import { db } from '../../../configs';
import { CarImages, Carlisting } from '../../../configs/schema';
import { eq } from 'drizzle-orm'; // ✅ FIXED
import Service from '@/Shared/Service';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';
import OwnersDetail from '../components/ownersDetail';
import FinancialCalcultor from '../components/FinancialCalcultor';

function ListingDetail() {
    const { id } = useParams();
    const [carDetail, setCarDetail] = useState(null); // ✅ Save result

    useEffect(() => {
        GetCarDetail();
    }, [id]); // ✅ Run only once when 'id' changes

    const GetCarDetail = async () => {
        const result = await db
            .select()
            .from(Carlisting)
            .innerJoin(CarImages, eq(Carlisting.id, CarImages.CarListingId))
            .where(eq(Carlisting.id, id));

        const resp = Service.FormatResult(result);
        setCarDetail(resp?.[0]);
        console.log(resp);
    };

    return (
        <div>
            <Header />
            <div className="p-10 md:px-20">
                {/* Header Detail Component */}
                <DetailsHeader carDetail={carDetail} />

                <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                    {/*Left*/}
                    <div className='md:col-span-2 '>

                        {/* Image Gallery*/}
                        <ImageGallery carDetail={carDetail} />
                        {/* Description*/}
                        <Description carDetail={carDetail} />
                        {/* Features List*/}
                        <Features features={carDetail?.features} />
                        {/* Financial Calculator */}
                        <FinancialCalcultor carDetail={carDetail}/>
                    </div>

                    {/*Right*/}
                    <div>
                        {/*Pricing */}
                        <Pricing carDetail={carDetail} />
                        {/*Car Specification */}
                        <Specification carDetail={carDetail} />
                        {/* Owners Details*/}
                        <OwnersDetail carDetail={carDetail} />

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ListingDetail;
