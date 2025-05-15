import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from '@radix-ui/react-select';
import { CiSearch } from "react-icons/ci";
import Data from '@/Shared/Data';
import { Link } from 'react-router-dom';

function Search() {
    const [cars, setCars] = useState('');
    const [make, setMake] = useState('');
    const [price, setPrice] = useState('');

    return (
        <div className='p-2 md:p-5 bg-white rounded-md 
        md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%] '>
            <Select onValueChange={(value) => setCars(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className='hidden md:block' />

            <Select onValueChange={(value) => setMake(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent>
                    {Data.CarMakes.map((maker) => (
                        <SelectItem key={maker.name} value={maker.name}>{maker.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className='hidden md:block' />

            <Select onValueChange={(value) => setPrice(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {Data.pricing.map((Price) => (
                        <SelectItem key={Price.Amout} value={Price.Amout}>{Price.Amout}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Link to={`/search?cars=${encodeURIComponent(cars)}&make=${encodeURIComponent(make)}&price=${encodeURIComponent(price)}`}>
                <CiSearch className="text-[40px] bg-blue-500 rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
            </Link>
        </div>
    );
}

export default Search;
