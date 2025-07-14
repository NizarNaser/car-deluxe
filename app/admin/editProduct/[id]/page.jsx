"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

const EditCar = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    category: '',
  });

  const [oldImages, setOldImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories') // جلب التصنيفات
      setCategories(response.data)

    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }
  useEffect(() => {
    if (id) {
      fetchData();
      fetchCategories()
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/cars`, { params: { id } });
      const car = res.data;
      console.log(car)
      setData({
        name: car.name || '',
        description: car.description || '',
        category: car.category || '',
      });

      setOldImages(car.images || []);
    } catch (error) {
      toast.error("Error fetching car");
    }
  };

  const onDeleteOldImage = (img) => {
    setImagesToDelete((prev) => [...prev, img]);
    setOldImages((prev) => prev.filter((i) => i !== img));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    newImages.forEach((img) => formData.append("images", img));

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("deletedImages", JSON.stringify(imagesToDelete));

    try {
      const res = await axios.put(`/api/cars?id=${id}`, formData);
      if (res.data.success) {
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Edit Car</h1>

      <p className='mt-4 text-xl'>Car Name</p>
      <input
        name='name'
        onChange={(e) => setData({ ...data, name: e.target.value })}
        value={data.name}
        type="text"
        className='mt-2 px-4 py-3 w-full border sm:w-[500px]'
        required
      />

      <p className='mt-4 text-xl'>Description</p>
      <textarea
        name='description'
        onChange={(e) => setData({ ...data, description: e.target.value })}
        value={data.description}
        rows={5}
        className='mt-2 px-4 py-3 w-full border sm:w-[500px]'
        required
      />

      <p className='mt-4 text-xl'>Category</p>
      <select
  onChange={(e) => setData({ ...data, category: e.target.value })}
  value={data.category?._id}
  className="w-full border p-2 rounded"
  required
>
  <option value=""> choose category</option>
  {categories.map((cat) => (
    <option key={cat?._id} value={cat?._id}>
      {cat?.name}
    </option>
  ))}
</select>



      <p className='mt-4 text-xl'>Old Images</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {oldImages.map((img, idx) => (
          <div key={idx} className="relative w-32 h-32 border rounded overflow-hidden">
            <img
              src={img.startsWith("http") ? img : img}
              alt={`Old ${idx}`}
              className="w-32 h-auto object-cover"
              onError={(e) => { e.target.src = "/uploads/default.jpeg"; }}
            />
            <button
              type="button"
              onClick={() => onDeleteOldImage(img)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              title="Delete"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <p className='mt-6 text-xl'>Add New Images</p>
      <input
        type="file"
        multiple
        className='mt-2'
        onChange={(e) => {
          const files = Array.from(e.target.files);
          setNewImages(files);
          if (files[0]) setPreviewImage(URL.createObjectURL(files[0]));
        }}
      />

      {previewImage && (
        <img src={previewImage} alt="New preview" className="mt-4 w-32 h-32 object-cover border" />
      )}

      <button type="submit" className='mt-6 px-6 py-3 bg-green-600 text-white rounded'>
        Save Changes
      </button>
    </form>
  );
};

export default EditCar;
