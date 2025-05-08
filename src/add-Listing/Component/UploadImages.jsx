import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { supabase } from './../../../configs/supabaseClient';
import { db } from './../../../configs';
import { CarImages } from './../../../configs/schema';

function UploadImages({ triggerUploadImages, onUploadComplete, setLoader }) { // ✅ MODIFIED
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (triggerUploadImages && selectedFileList.length > 0) {
      console.log("Triggering image upload for listing:", triggerUploadImages);
      uploadImages();
    }
  }, [triggerUploadImages]);

  const onFileSelected = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFileList((prevFiles) => [...prevFiles, ...files]);
  };

  const onImageRemove = (image) => {
    setSelectedFileList((prevFiles) => prevFiles.filter((item) => item !== image));
  };

  const uploadImages = async () => {
    if (!triggerUploadImages) {
      console.error("No carListingId provided. Cannot insert image data.");
      return;
    }

    if (setLoader) setLoader(true); // ✅ ADDED

    const urls = [];

    for (const file of selectedFileList) {
      const fileExt = file.name.includes('.') ? file.name.split('.').pop() : 'jpg';
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `upload_images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('prime-wheels')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload failed:', uploadError.message);
        continue;
      }

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from('prime-wheels')
        .getPublicUrl(filePath);
      const publicUrl = publicUrlData?.publicUrl;

      if (urlError || !publicUrl) {
        console.error('Error retrieving public URL:', urlError?.message || 'URL is undefined');
        continue;
      }

      urls.push(publicUrl);
      console.log('Uploaded to:', filePath);
      console.log('Public URL:', publicUrl);

      try {
        await db.insert(CarImages).values({
          imageUrl: publicUrl,
          CarListingId: triggerUploadImages,
        });
        console.log('Image URL inserted into DB');
      } catch (dbError) {
        console.error('Error inserting image into database:', dbError);
      }
    }

    setImageUrls(urls);
    if (onUploadComplete) onUploadComplete(urls);
    if (setLoader) setLoader(false); // ✅ ADDED
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-3 text-lg text-white cursor-pointer"
              onClick={() => onImageRemove(image)}
              title="Remove image"
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt="preview"
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple
          id="upload-images"
          onChange={onFileSelected}
          className="opacity-0"
        />
      </div>
    </div>
  );
}

export default UploadImages;
