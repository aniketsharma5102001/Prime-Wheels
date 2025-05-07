import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoMdCloseCircle } from "react-icons/io";
import { supabase } from './../../../configs/supabaseClient';

function UploadImages() {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    setSelectedFileList([...selectedFileList, ...files]); // Properly update file state
  };

  const onImageRemove = (image) => {
    setSelectedFileList(selectedFileList.filter((item) => item !== image));
  };

  const uploadImages = async () => {
    const urls = [];

    for (const file of selectedFileList) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `upload_images/${fileName}`;

      // Ensure user is authenticated before uploading
      const { data: session } = await supabase.auth.getSession();
      if (!session) {
        console.error("User is not authenticated!");
        return;
      }

      const { error } = await supabase.storage
        .from('prime-wheels')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error('Upload failed:', error.message);
        continue;
      }

      // Retrieve the public URL correctly
      const { publicUrl } = supabase.storage.from('prime-wheels').getPublicUrl(filePath);
      if (publicUrl) {
        urls.push(publicUrl);
        console.log('Uploaded to:', filePath);
      } else {
        console.error('Error retrieving public URL');
      }
    }

    setImageUrls(urls); // Store URLs for preview
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-3 text-lg text-white"
              onClick={() => onImageRemove(image)}
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

      <Button onClick={uploadImages}>Upload Images</Button>

      {imageUrls.length > 0 && (
        <div className="mt-5">
          <h3 className="font-medium text-xl">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {imageUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  className="w-full h-[130px] object-cover rounded-xl"
                  alt="uploaded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImages;