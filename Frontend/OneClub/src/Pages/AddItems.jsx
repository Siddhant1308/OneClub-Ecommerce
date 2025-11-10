import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddItems = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);       // local file
  const [previewUrl, setPreviewUrl] = useState('');             // preview URL
  const [uploading, setUploading] = useState(false);

  const IMGBB_API_KEY = 'cd68133847ac183652c7197283ee5f97';

  const categories = [
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Jewellery' }
  ];

  const subcategories = [
    { id: 1, name: 'topwear', categoryId: 1 },
    { id: 2, name: 'bottomwear', categoryId: 1 },
    { id: 3, name: 'winterwear', categoryId: 1 },
    { id: 4, name: 'summerwear', categoryId: 1 },
    { id: 5, name: 'tv', categoryId: 2 },
    { id: 6, name: 'mobile', categoryId: 2 },
    { id: 7, name: 'gaming', categoryId: 2 },
    { id: 8, name: 'audio', categoryId: 2 },
    { id: 9, name: 'accessories', categoryId: 2 },
    { id: 10, name: 'jewellery', categoryId: 3 }
  ];

  const genderOptions = [
    { label: 'Men', value: 'M' },
    { label: 'Women', value: 'F' },
    { label: 'Kids', value: 'K' },
    { label: 'Unisex', value: 'U' }
  ];

  const selectedCategoryId = watch('category');
  const selectedCategoryName = categories.find(cat => String(cat.id) === selectedCategoryId)?.name;
  const filteredSubcategories = subcategories.filter(sub => String(sub.categoryId) === selectedCategoryId);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      alert('Please upload an image.');
      return;
    }

    try {
      setUploading(true);

      // Upload image to ImgBB
      const formData = new FormData();
      formData.append('image', selectedFile);

      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
      const uploadedUrl = res.data?.data?.url;
      if (!uploadedUrl) throw new Error('Image upload failed');

      // Build payload
      const payload = {
        title: data.title,
        price: parseFloat(data.price),
        description: data.description,
        image: uploadedUrl,
        rating: parseFloat(data.rating),
        gender: data.gender,
        categoryId: parseInt(data.category, 10),
        subcategoryId: parseInt(data.subcategory, 10),
        quantity: parseInt(data.quantity, 10)
      };

      console.log('Submitting payload:', payload);
      // TODO: send payload to backend

      reset();
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error('Error uploading or submitting:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='mt-6 sm:mt-10 p-4 w-full max-w-4xl bg-white rounded'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        {/* Upload preview */}
        <div>
          <p className='mb-2 font-semibold text-gray-700'>Upload Image</p>
          {!previewUrl ? (
            <label className='w-32 h-32 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded'>
              <input type='file' accept='image/*' onChange={handleFileChange} className='hidden' />
              <span className='text-xs text-gray-500'>Click to upload</span>
            </label>
          ) : (
            <div className='relative mt-2 w-32 h-32'>
              <img src={previewUrl} alt="Preview" className='w-full h-full object-cover rounded border border-gray-300' />
              <button type='button' onClick={removeImage}
                className='absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center'>
                ✖
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <p>Product title</p>
          <input {...register('title', { required: 'Title is required' })}
            className='w-full px-3 py-2 border border-gray-600 rounded' placeholder='Type here' />
          {errors.title && <p className='text-red-500 text-xs'>{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <p>Product description</p>
          <textarea {...register('description', { required: 'Description is required' })}
            className='w-full px-3 py-2 border border-gray-600 rounded' placeholder='Write content here' />
          {errors.description && <p className='text-red-500 text-xs'>{errors.description.message}</p>}
        </div>

        {/* Category, Subcategory, Price */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div>
            <p>Category</p>
            <select {...register('category', { required: 'Category is required' })}
              className='w-full px-3 py-2 border border-gray-600 rounded'>
              <option value='' disabled>Select category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            {errors.category && <p className='text-red-500 text-xs'>{errors.category.message}</p>}
          </div>

          <div>
            <p>Subcategory</p>
            <select {...register('subcategory', { required: 'Subcategory is required' })}
              disabled={!selectedCategoryId}
              className='w-full px-3 py-2 border border-gray-600 rounded'>
              <option value='' disabled>Select subcategory</option>
              {filteredSubcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
            </select>
            {errors.subcategory && <p className='text-red-500 text-xs'>{errors.subcategory.message}</p>}
          </div>

          <div>
            <p>Price</p>
            <input type='number' step='0.01'
              {...register('price', { required: 'Price is required', min: 0 })}
              className='w-full px-3 py-2 border border-gray-600 rounded' />
            {errors.price && <p className='text-red-500 text-xs'>{errors.price.message}</p>}
          </div>
        </div>

        {/* Quantity, Rating, Gender */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div>
            <p>Qty</p>
            <input type='number' defaultValue={1}
              {...register('quantity', { required: 'Quantity is required', min: 1 })}
              className='w-full px-3 py-2 border border-gray-600 rounded' />
            {errors.quantity && <p className='text-red-500 text-xs'>{errors.quantity.message}</p>}
          </div>

          <div>
            <p>Rating</p>
            <input type='number' step='0.1'
              {...register('rating', { required: 'Rating is required', min: 1 })}
              className='w-full px-3 py-2 border border-gray-600 rounded' />
            {errors.rating && <p className='text-red-500 text-xs'>{errors.rating.message}</p>}
          </div>

          {selectedCategoryName !== 'Electronics' && selectedCategoryId && (
            <div>
              <p>Gender</p>
              <select {...register('gender', { required: 'Gender is required' })}
                className='w-full px-3 py-2 border border-gray-600 rounded'>
                <option value='' disabled>Select gender</option>
                {genderOptions.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
              {errors.gender && <p className='text-red-500 text-xs'>{errors.gender.message}</p>}
            </div>
          )}
        </div>

        <button type='submit' disabled={uploading}
          className='w-full sm:w-32 py-3 mt-4 bg-black text-white cursor-pointer rounded'>
          {uploading ? 'Uploading...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddItems;