import Header from '@/components/Header'
import React from 'react'
import CarDetails from './../Shared/CarDetails.json';
import InputField from './Component/InputField';
import DropdownField from '@/components/DropdownField';

import { Separator } from '@/components/ui/separator';
import Features from './../Shared/Features.json';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { db } from './../../configs';
import { Carlisting } from './../../configs/schema';
import TextAreaField from '@/components/TextAreaField';
import IconField from '@/components/IconField';
import UploadImage from './Component/UploadImages';




function AddListing() {

  const [formData, setFormData] = useState([]);
  const [FeaturesData,setFeaturesData]=useState([]);
/**
 * used to capture user input from form  
 * @param {*} name 
 * @param {*} value 
 */

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData, [name]: value
    }))
    console.log(formData);
  }
/**
 * used to save selected feature list
 * @param {*} name 
 * @param {*} value 
 */


const handleFeatureChange=(name,value)=>{
  setFeaturesData((prevData)=>({
    ...prevData,
    [name]:value
  }))

  console.log(FeaturesData);
}
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const result = await db.insert(Carlisting).values({
        ...formData,
        features:FeaturesData
    });
      if (result) {
        console.log("Data Saved")
      }
    } catch (e) {
      console.log("Error", e)
    }
  };
  return (
    <div>
      <Header />
      <div className='px-10 md:px-20 my-10'>
        <h2 className='font-bold text-4xl'> Add New Listing  </h2>
        <form className='p-10 border rounded-xl mt-10'>
          {/* Car Details*/}
          <div>
            <h2 className='font-medium text-xl mb-6'>Car Details</h2>

            <div className='grid grid-cols-1  md:grid-cols-2 gap-5'>
              {CarDetails.CarDetails.map((item, index) => (
                <div key={index}>
                  <label className='text-sm flex gap-2 items-center mb-2'>
                    <IconField icon={item?.icon }/>
                    {item.label} {item.required && <span className='text-red-700'>*</span>}</label>
                  {item.fieldType == 'text' || item.fieldType == 'number'
                    ? < InputField item={item} handleInputChange={handleInputChange} />
                    : item.fieldType == 'dropdown'
                      ? <DropdownField item={item} handleInputChange={handleInputChange} />
                      : item.fieldType == 'textarea'
                        ? <TextAreaField item={item} handleInputChange={handleInputChange} />
                        : null}
                </div>
              ))}
            </div>

          </div>
          <Separator className="my-6" />
          {/* Features List*/}
          <h2 className='font-medium text-xl my-6'>Features</h2>
          <div className='grid grid-cols-2 md:grid-cols-3'>
            {Features.Features.map((item, index) => (
              <div key={index} className='flex gap-2 items-center'>
                <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)} />
                <h2>{item.label}</h2>
              </div>

            ))}
          </div>
          {/* Car Images*/}
          <Separator />
          <UploadImage/>

          <div className='mt-5 flex justify-end'>
            <Button type="submit" onClick={(e) => onSubmit(e)} >
              Submit
            </Button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default AddListing