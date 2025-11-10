import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductFormFields from '../Components/ProductFormFields';
import axios from 'axios';

export default function EditItem({ product: propProduct }) {
  const navigate = useNavigate();
  const location = useLocation();
  const product = propProduct || location.state?.product;

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
  const [uploading, setUploading] = useState(false);
  const [changingPhoto, setChangingPhoto] = useState(false);

  const categories = [ /* same */ ];
  const subcategories = [ /* same */ ];
  const genderOptions = [ /* same */ ];

  const selectedCategoryId = watch('category');

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        rating: product.rating,
        gender: product.gender,
        category: product.categoryId?.toString(),
        subcategory: product.subcategoryId?.toString(),
        quantity: product.quantity
      });
    }
  }, [product, reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    await new Promise(res => setTimeout(res, 1000));
    setValue('image', 'https://example.com/' + file.name);
    setUploading(false);
  };

  const onSubmit = async () => {
    const payload = { /* build from data */ };
    try {
      await axios.put(`http://localhost:9000/products/${product.id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Product updated!');
      navigate(-1);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  if (!product) return <div>Product data not found</div>;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <button onClick={() => navigate(-1)} className="absolute top-4 right-4 text-xl">✕</button>
      <div className="max-w-3xl mx-auto mt-12 p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* 📸 Image section */}
          <div>
            <p className="mb-2 font-medium text-gray-700">Current Image:</p>
            <img src={watch('image')} alt="Product" className="w-28 h-28 rounded object-cover border mb-2" />
            {!changingPhoto ? (
              <button type="button" onClick={() => setChangingPhoto(true)} className="text-sm text-blue-600 underline">Change Photo</button>
            ) : (
              <div className="flex flex-col gap-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {uploading && <p className="text-xs text-gray-500">Uploading...</p>}
              </div>
            )}
          </div>

          <ProductFormFields
            register={register}
            errors={errors}
            watch={watch}
            categories={categories}
            subcategories={subcategories}
            genderOptions={genderOptions}
            selectedCategoryId={selectedCategoryId}
          />

          <button type="submit" className="bg-black text-white py-2 rounded">Update Product</button>
        </form>
      </div>
    </div>
  );
}