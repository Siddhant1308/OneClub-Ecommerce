import React, { useState } from 'react';
import axios from 'axios';

const ImgBBUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = 'cd68133847ac183652c7197283ee5f97';

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadedImageUrl(''); // clear previous url
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      if (response.data && response.data.success) {
        const url = response.data.data.url;
        setUploadedImageUrl(url);
        console.log('Uploaded image URL:', url);
      } else {
        console.error('Upload failed:', response.data);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Upload Image to ImgBB</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadedImageUrl && (
        <div className="mt-4">
          <p className="text-green-600 font-medium">Image uploaded successfully!</p>
          <a
            href={uploadedImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Image
          </a>
          <div className="mt-2">
            <img src={uploadedImageUrl} alt="Uploaded" className="max-w-full h-auto rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgBBUploader;